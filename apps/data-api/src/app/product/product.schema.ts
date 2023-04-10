import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuid } from 'uuid';
import { Review } from "../review/review.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product{
    @Prop({
        required: true,
        unique: true,
      })
      name: string;

    @Prop({
        required:true
    })
    description: string;

    @Prop({
        required:true
    })
    category: string;

    @Prop({
        required:true
    })
    price: number

    @Prop({
        required:true
    })
    brand: string

    @Prop({
    })
    reviews: Review[]

    @Prop({
    })
    relatedProducts: Product[]
}

export const ProductSchema = SchemaFactory.createForClass(Product);