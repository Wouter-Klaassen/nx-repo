import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductInfo } from "@nx-repo/data";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.schema";

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>, ){}

    async getAll(): Promise<ProductInfo[]>{
        return this.productModel.find();
    }

    async getOne(productId: string): Promise<ProductInfo | null>{
        return this.productModel.findById(
            productId,
        );
    }

    async delete(productId: string){
        await this.productModel.findByIdAndDelete(productId)
    }

    async create(product: Product){
        const newProduct = new this.productModel(product)
        return newProduct.save()
    }

    async update(productId: string, updates: Product){
        await this.productModel.findByIdAndUpdate({_id : productId}, updates)
    }

}