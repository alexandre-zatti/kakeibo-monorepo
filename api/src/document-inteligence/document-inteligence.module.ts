import { Module } from '@nestjs/common';
import { DocumentInteligenceService } from './document-inteligence.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DocumentInteligenceService],
  exports: [DocumentInteligenceService],
})
export class DocumentInteligenceModule {}
