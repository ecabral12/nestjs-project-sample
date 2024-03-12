import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fullUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}${req.originalUrl}`;
    console.log(req.method + " ---------------> ", fullUrl);
    next();
  }
}
