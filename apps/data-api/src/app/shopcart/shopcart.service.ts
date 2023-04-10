import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ShopcartInfo } from "@nx-repo/data";
import { Model } from "mongoose";
import { Shopcart, ShopcartDocument } from "./shopcart.schema";

@Injectable()
export class ShopcartService{
    constructor(@InjectModel(Shopcart.name) private shopcartModel: Model<ShopcartDocument>){}

    async getAll(): Promise<ShopcartInfo[]>{
        return this.shopcartModel.find();
    }

    async getOne(shopcartId: string): Promise<ShopcartInfo | null>{
        return this.shopcartModel.findById(
            shopcartId,
        );
    }

    async delete(reviewId: string){
        await this.shopcartModel.findByIdAndDelete(reviewId)
    }

    async create(shopcart: Shopcart){
        const newShopcart = new this.shopcartModel(shopcart)

        await newShopcart.save()
    }

    async update(shopcartId: string, updates: Shopcart){
        await this.shopcartModel.findByIdAndUpdate({_id : shopcartId}, updates)
    }

    async getByUser(id: string){
        console.log("id : " + id)
        return this.shopcartModel.find({
            userId : id
        })
    }
}