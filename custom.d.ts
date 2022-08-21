type Admin = {
    id: string,
    roles: string[]
    first_name?: string
    last_name?: string
}

declare namespace Express {
    export interface Request {
        user?: any,
        admin?: Admin
    }
}