import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ProductInfo } from "@nx-repo/data";
import { Product } from "./product.schema";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Get()
    async getAll(): Promise<ProductInfo[]>{
        return this.productService.getAll();
    }
    
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<ProductInfo>{
        
        return this.productService.getOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() update: Product) {
        try{
            await this.productService.update(id, update )
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            console.log(e);
            
            throw new HttpException("Update Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body()product: Product){
        try{
            await this.productService.create(product)
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            throw new HttpException("Creation Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.productService.delete(id)
    }
}