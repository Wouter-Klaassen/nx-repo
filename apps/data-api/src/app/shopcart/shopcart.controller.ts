import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import {  ShopcartInfo } from "@nx-repo/data";
import { Shopcart } from "./shopcart.schema";
import { ShopcartService } from "./shopcart.service";

@Controller('review')
export class ShopcartController{
    constructor(private readonly shopcartService: ShopcartService){}

    @Get()
    async getAll(): Promise<ShopcartInfo[]>{
        return this.shopcartService.getAll();
    }
    
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<ShopcartInfo>{
        
        return this.shopcartService.getOne(id);
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
    async create(@Body()shopcart: Shopcart){
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