import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { PurchaseLogInfo } from "@nx-repo/data";
import { PurchaseLog } from "./purchase_log.schema";
import { PurchaseLogService } from "./purchase_log.service";

@Controller('purchase_log')
export class PurchaseLogController{
    constructor(private readonly purchaseLogService: PurchaseLogService){}

    @Get()
    async getAll(): Promise<PurchaseLogInfo[]>{
        return this.purchaseLogService.getAll();
    }
    
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<PurchaseLogInfo>{
        
        return this.purchaseLogService.getOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() update: PurchaseLog) {
        try{
            await this.purchaseLogService.update(id, update )
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            console.log(e);
            
            throw new HttpException("Update Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body()purchaseLog: PurchaseLog){
        try{
            await this.purchaseLogService.create(purchaseLog)
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            throw new HttpException("Creation Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.purchaseLogService.delete(id)
    }
}