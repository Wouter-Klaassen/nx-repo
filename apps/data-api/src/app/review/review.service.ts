import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReviewInfo } from "@nx-repo/data";
import { Model } from "mongoose";
import { Review, ReviewDocument } from "../review/review.schema";

@Injectable()
export class ReviewService{
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>){}

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

        await newReview.save()
    }

    async update(reviewId: string, updates: Review){
        await this.reviewModel.findByIdAndUpdate({_id : reviewId}, updates)
    }
}