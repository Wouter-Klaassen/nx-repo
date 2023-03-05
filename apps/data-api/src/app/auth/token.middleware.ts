import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class TokenMiddleware implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        throw new Error("Method not implemented.");
    }
    
}