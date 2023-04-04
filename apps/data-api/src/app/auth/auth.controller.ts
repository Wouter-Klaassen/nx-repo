import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ResourceId, Token, UserCredentials, UserRegistration } from '@nx-repo/data';
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}


    @Post('register')
    async register(@Body() credentials: UserRegistration): Promise<ResourceId> {
        console.log(credentials);
        
        try {
            await this.authService.registerUser(credentials.username, credentials.password, credentials.emailAddress);
            
            const newUser = await this.authService.createUser(credentials.username, credentials.emailAddress, credentials.roles);
            await this.authService.createNode(newUser.id)
            return {id: newUser.id};
        } catch (e) {
            console.log(e);
            
            throw new HttpException("Username invalid", HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() credentials: UserCredentials): Promise<Token> {
        try {
            return {
                token: await this.authService.generateToken(credentials.username, credentials.password)
            };
        } catch (e) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}
