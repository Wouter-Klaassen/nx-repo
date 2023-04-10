import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PurchaseLogInfo } from "@nx-repo/data";
import { Model } from "mongoose";
import { PurchaseLog, PurchaseLogDocument } from "./purchase_log.schema";

@Injectable()
export class PurchaseLogService{
    constructor(@InjectModel(PurchaseLog.name) private purchaseLogModel: Model<PurchaseLogDocument>){}

    async getAll(): Promise<PurchaseLogInfo[]>{
        return this.purchaseLogModel.find();
    }

    async getOne(purchaseLogId: string): Promise<PurchaseLogInfo | null>{
        return this.purchaseLogModel.findById(
            purchaseLogId,
        );
    }

    async delete(purchaseLogId: string){
        await this.purchaseLogModel.findByIdAndDelete(purchaseLogId)
    }

    async create(purchaselog: PurchaseLog){
        const newPurchaseLog = new this.purchaseLogModel(purchaselog)

        await newPurchaseLog.save()
    }

    async update(purchaseLogId: string, updates: PurchaseLog){
        await this.purchaseLogModel.findByIdAndUpdate({_id : purchaseLogId}, updates)
    }
}