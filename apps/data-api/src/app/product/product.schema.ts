import { Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product{}

export const ProductSchema = SchemaFactory.createForClass(Product);