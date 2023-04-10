import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const token = req.headers['auth-user'] as string;
    if (token) {
      const decoded = verify(token, 'safa') as JwtPayload;
      const userId = decoded.userId;
      if (userId) req['userId'] = userId;
      else
        return res
          .status(401)
          .json({ error: 'vous ne pouvez pas accéder à cette ressource' });
    } else {
      console.log(token);
      return res
        .status(401)
        .json({ error: 'vous ne pouvez pas accéder à cette ressource' });
    }
    next();
  }
}
