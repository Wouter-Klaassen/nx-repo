import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReviewInfo } from "@nx-repo/data";
import { Model } from "mongoose";
import { Neo4jService } from "../neo4j/neo4j.service";
import { ProductService } from "../product/product.service";
import { Review, ReviewDocument } from "../review/review.schema";
import { NeoQueries } from "./review.cypher";

@Injectable()
export class ReviewService{
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>, private readonly productService: ProductService, private readonly neo4jService: Neo4jService){}

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

    async addToProduct(idA:string,idB:string){
        await this.neo4jService.singleWrite(NeoQueries.addToProduct,{idA,idB})
    }

    async createNode(userId:string, id: string){
       await this.neo4jService.singleWrite(NeoQueries.addNode, {id}) 
       await this.neo4jService.singleWrite(NeoQueries.addNode, {userId, id})
    }

    async removeNode(id: string){
        await this.neo4jService.singleWrite(NeoQueries.deleteNode, {id})
    }
}