import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReviewInfo } from "@nx-repo/data";
import { Document, Model, Types } from "mongoose";
import { ProductService } from "../product/product.service";
import { Review, ReviewDocument } from "../review/review.schema";

@Injectable()
export class ReviewService{
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>, private readonly productService: ProductService){}

    async getAll(): Promise<ReviewInfo[]>{
        return this.reviewModel.find();
    }

    async getOne(reviewId: string): Promise<ReviewInfo | null>{
        return this.reviewModel.findById(
            reviewId,
        );
    }

    async delete(reviewId: string){
        await this.reviewModel.findByIdAndDelete(reviewId)
    }

    async create(review: Review){
        const newReview = new this.reviewModel(review)
        return newReview.save()
    }

    async update(reviewId: string, updates: Review){
        await this.reviewModel.findByIdAndUpdate({_id : reviewId}, updates)
    }
}