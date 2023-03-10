import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
        await this.productService.update(id, update);
    }

    @Post('create')
    async create(@Body()product: Product){
        await this.productService.create(product)
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.productService.delete(id)
    }
}