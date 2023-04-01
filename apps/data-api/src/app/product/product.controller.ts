import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from "@nestjs/common";
import { ProductInfo } from "@nx-repo/data";
import { InjectToken, Token } from "../auth/token.decorator";
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
            console.log(process.env.NEO4J_DATABASE)
            throw new HttpException("Update Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async create(@Body()product: Product){
        try{
            const newProduct = await this.productService.create(product)
            await this.productService.createNode(newProduct.id)
            return newProduct
        }
        catch(e){
            console.log(e)
            throw new HttpException("Creation Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.productService.delete(id)
        await this.productService.deleteNode(id)
    }

    @Post(':idA/relate/:idB')
    async createRelation(@Param('idA') idA: string, @Param('idB') idB: string){
        console.log('id A : ' + idA +  ', id B : ' + idB)
        await this.productService.addProductRelation(idA, idB)
    }

    @Delete(':idA/relate/:idB')
    async deleteRelation(@Param('idA') idA: string, @Param('idB') idB: string){
        await this.productService.deleteProductRelation(idA, idB)
    }

    @Get(':id/relate')
    async getRelatedProducts(@Param('id') id: string){
//        const products = await this.productService.getRelatedProducts(id)
        return this.productService.getRelatedProducts(id)
    }
}