import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private tokenService: TokenService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        return next()
        const unProtectedRoutes = ['/', '/login']
        if (unProtectedRoutes.includes(req.path)) next()
        else {
            const token = req.headers['authorization']?.split(' ')[1]
            const verifiedToken = await this.tokenService.verifyToken(token)
            if (!verifiedToken) throw new UnauthorizedException()
            if (!verifiedToken.roles.includes('admin')) throw new ForbiddenException()
            req.admin = verifiedToken
            next()
        }
    }
}
