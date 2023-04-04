import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReviewInfo } from "@nx-repo/data";
import { InjectToken, Token } from "../auth/token.decorator";
import { Product } from "../product/product.schema";
import { Review } from "./review.schema";
import { ReviewService } from "./review.service";

@Controller('review')
export class ReviewController{
    constructor(private readonly reviewService: ReviewService){}

    @Get()
    async getAll(): Promise<ReviewInfo[]>{
        return this.reviewService.getAll();
    }
    
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<ReviewInfo>{
        
        return this.reviewService.getOne(id);
    }

    @Get('product/:id')
    async getByProduct(@Param('id') id: string){
        return this.reviewService.getProductReviews(id);
    }

    @Get('user/:id')
    async getByUser(@Param('id') id :string){
        console.log('id: ' + id)
        return this.reviewService.getUserReviews(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() update: Review) {
        try{
            await this.reviewService.update(id, update )
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            console.log(e);
            
            throw new HttpException("Update Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':productId')
    async create(@InjectToken() token : Token, @Body()review: Review, @Param('productId') productId: string){
        try{
            review.productId = productId
            review.userId = token.id
            console.log(token.id)
            const newReview = await this.reviewService.create(review)
            await this.reviewService.createNode(token.id, newReview.id)
            await this.reviewService.addToProduct(productId, newReview.id)
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            console.log(e)
            throw new HttpException("Creation Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.reviewService.delete(id)
        await this.reviewService.removeNode(id)
    }
}