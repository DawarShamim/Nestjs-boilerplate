import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCodeColor =
        res.statusCode >= 200 && res.statusCode < 300
          ? '\x1b[32m' // Green color for 2xx status codes (successful)
          : res.statusCode >= 400 && res.statusCode < 500
            ? '\x1b[33m' // Yellow color for 4xx status codes (client errors)
            : res.statusCode >= 500
              ? '\x1b[31m' // Red color for 5xx status codes (server errors)
              : '\x1b[0m'; // Reset color for other status codes
      console.log(
        `${statusCodeColor}${req.method}\x1b[0m ${req.originalUrl} - ${statusCodeColor}${res.statusCode}\x1b[0m - ${duration}ms`,
      );
    });
    next();
  }
}
