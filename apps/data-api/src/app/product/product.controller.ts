import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductInfo } from "@nx-repo/data";
import { InjectToken, Token } from "../auth/token.decorator";
import { Product } from "./product.schema";
import { ProductService } from "./product.service";
import { RolesGuard } from "../auth/admin.guard";
import { Roles } from "../auth/roles.decorator";

@Controller('product')
// @UseGuards(RolesGuard)
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Get()
    // @Roles('admin')   
    async getAll(): Promise<ProductInfo[]>{
        return this.productService.getAll();
    }
    
    @Get(':id')
    // @Roles('admin')    
    async getOne(@Param('id') id: string): Promise<ProductInfo>{
        
        return this.productService.getOne(id);
    }

    
    @Put(':id')
    // @Roles('admin')
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
    // @Roles('admin')
    async create(@Body()product: Product){
        try{
            const newProduct = await this.productService.create(product)
            return newProduct
        }
        catch(e){
            console.log(e)
            throw new HttpException("Creation Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    // @Roles('admin')
    async delete(@Param('id') id: string){
        await this.productService.delete(id)
    }
}