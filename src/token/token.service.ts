import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

type SignToken = {
    payload: {
        [key: string]: any,
    },
    expiresIn?: JwtSignOptions['expiresIn']
}

@Injectable()
export class TokenService {

    constructor(
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signToken(data: SignToken) {
        const { payload, expiresIn } = data
        const options = {
            expiresIn,
            secret: this.config.get('JWT_SECRET')
        }
        return await this.jwt.signAsync(payload, options)
    }

    async verifyToken(token: string) {
        try {
            return await this.jwt.verifyAsync(token, {
                secret: this.config.get('JWT_SECRET')
            })
        } catch (error) {
            return false
        }
    }
}