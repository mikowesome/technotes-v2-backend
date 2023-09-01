import { Injectable,NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GlobalPrefixMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Add the global prefix to the request url
        req.url = `/api/v1${req.url}`;
        next();
    }
}