import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductInfo } from "@nx-repo/data";
import { Model } from "mongoose";
import { Neo4jService } from "../neo4j/neo4j.service";
import { Product, ProductDocument } from "./product.schema";
import { NeoQueries } from "./product.cypher";

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>, private readonly neo4jService: Neo4jService){}

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

    async addProductRelation(idA: string, idB: string){
        await this.neo4jService.singleWrite(NeoQueries.relateProducts, {idA, idB})
    }

    async deleteProductRelation(idA: string, idB: string){
        await this.neo4jService.singleWrite(NeoQueries.removeRelation, {idA, idB})
    }

    async getRelatedProducts(productId: string){
        const ids = await this.neo4jService.singleRead(NeoQueries.findRelated,{productId})

        console.log(ids.records)

        const matches= [];

        for(const record of ids.records){
            const id = record.get('match');
            console.log('id:' + id)
            const match = await this.productModel.findOne({ _id: id });
            matches.push(match)
        }

        console.log(matches)

        return matches
    }

    async createNode(id: string) {
        await this.neo4jService.singleWrite(NeoQueries.createNode,{id})
    }

    async deleteNode(id:string){
        await this.neo4jService.singleWrite(NeoQueries.deleteNode,{id})
    }
}