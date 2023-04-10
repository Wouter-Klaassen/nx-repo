import { Bind, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import {  ShopcartInfo } from "@nx-repo/data";
import { Token } from "../auth/token.decorator";
import { Shopcart } from "./shopcart.schema";
import { ShopcartService } from "./shopcart.service";
import { InjectToken } from "../auth/token.decorator";
import { UserService } from "../auth/user/user.service";

@Controller('shopcart')
export class ShopcartController{
    constructor(private readonly shopcartService: ShopcartService, private readonly userService : UserService){}

    @Get()
    async getAll(): Promise<ShopcartInfo[]>{
        return this.shopcartService.getAll();
    }
    
    // @Get(':id')
    // async getOne(@Param('id') id: string): Promise<ShopcartInfo>{
        
    //     return this.shopcartService.getOne(id);
    // }

    @Get('user')
    async getByUser(@InjectToken() token : Token ){
        console.log("token id : " + token.id)
        const user = await this.userService.getOne(token.id)
        const results = await this.shopcartService.getByUser(user.id)
        return results
    }


    @Put(':id')
    async update(@Param('id') id: string, @Body() update: Shopcart) {
        try{
            await this.shopcartService.update(id, update )
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            console.log(e);
            
            throw new HttpException("Update Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@InjectToken() token : Token ,@Body()shopcart: Shopcart){
        try{
            await this.shopcartService.create(shopcart)
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            throw new HttpException("Creation Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.shopcartService.delete(id)
    }
}