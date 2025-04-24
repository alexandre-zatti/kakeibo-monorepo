import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader: string | undefined = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token: string = authHeader.replace(/^Bearer\s+/i, '').trim();
    const expectedToken: string | undefined =
      this.configService.get<string>('API_KEY');

    if (!expectedToken || token !== expectedToken) {
      throw new UnauthorizedException('Invalid API token');
    }

    return true;
  }
}
