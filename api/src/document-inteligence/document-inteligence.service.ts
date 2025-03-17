import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import createClient, {
  AnalyzedDocumentOutput,
  AnalyzeOperationOutput,
  DocumentIntelligenceClient,
  DocumentIntelligenceErrorResponseOutput,
  getLongRunningPoller,
  isUnexpected,
} from '@azure-rest/ai-document-intelligence';
import { ConfigService } from '@nestjs/config';
import { AzureKeyCredential } from '@azure/core-auth';
import {
  ReceiptItemsArray,
  validateReceiptFields,
} from '../shared/types/documentReceipt';

@Injectable()
export class DocumentInteligenceService {
  private readonly client: DocumentIntelligenceClient;

  constructor(private readonly configService: ConfigService) {
    const diEndpoint = this.configService.get<string>('DI_ENDPOINT');
    const diKey = this.configService.get<string>('DI_KEY');

    if (!diEndpoint || !diKey) {
      throw new UnauthorizedException(
        'Credentials for connecting to Azure DI are invalid!',
      );
    }

    this.client = createClient(diEndpoint, new AzureKeyCredential(diKey));
  }

  async extractItemsFromReceiptDocument(
    receiptFile: Express.Multer.File,
  ): Promise<ReceiptItemsArray> {
    const initialResponse = await this.client
      .path('/documentModels/{modelId}:analyze', 'prebuilt-receipt')
      .post({
        contentType: 'application/json',
        body: {
          base64Source: receiptFile.buffer.toString('base64'),
        },
      });

    if (isUnexpected(initialResponse)) {
      throw new UnprocessableEntityException(
        initialResponse.body.error.message,
      );
    }

    const poller = getLongRunningPoller(this.client, initialResponse);
    const analyzeResult = await poller.pollUntilDone();

    if (analyzeResult.status !== HttpStatus.OK.toString()) {
      const errorResponseOutput =
        analyzeResult.body as DocumentIntelligenceErrorResponseOutput;
      throw new UnprocessableEntityException(errorResponseOutput.error.message);
    }

    const analyzeResultBody = analyzeResult.body as AnalyzeOperationOutput;

    const documents = analyzeResultBody.analyzeResult?.documents;
    const document = documents?.[0];

    if (!document) {
      throw new UnprocessableEntityException(
        'Expected at least one document in the result.',
      );
    }

    return this.validateReceiptDocument(document);
  }

  private validateReceiptDocument(
    receiptDocument: AnalyzedDocumentOutput,
  ): ReceiptItemsArray {
    return validateReceiptFields(receiptDocument.fields).Items;
  }
}
