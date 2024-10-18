import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly morganMiddleware: any;

  constructor() {
    // other formats ('tiny', 'short'), etc.
    this.morganMiddleware = morgan('dev');
    // this.morganMiddleware = morgan((tokens, req, res) => {
    //   return [
    //     'Process ID:',
    //     process.pid,
    //     tokens.method(req, res),
    //     tokens.url(req, res),
    //     tokens.status(req, res),
    //     tokens.res(req, res, 'content-length'),
    //     '-',
    //     tokens['response-time'](req, res),
    //     'ms',
    //   ].join(' ');
    // });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.morganMiddleware(req, res, next);
  }
}
