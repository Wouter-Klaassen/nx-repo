import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ReviewInfo } from "@nx-repo/data";
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

    @Post()
    async create(@Body()review: Review){
        try{
            await this.reviewService.create(review)
            return {statusCode: 200, message:"OK"}
        }
        catch(e){
            throw new HttpException("Creation Unsuccesfull", HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        await this.reviewService.delete(id)
    }
}