import { Schema, SchemaFactory } from "@nestjs/mongoose";

export type ShopcartDocument = Shopcart & Document;

@Schema()
export class Shopcart{}

export const ShopcartSchema = SchemaFactory.createForClass(Shopcart);