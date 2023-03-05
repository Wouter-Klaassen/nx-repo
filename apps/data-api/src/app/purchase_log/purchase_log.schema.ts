import { Schema, SchemaFactory } from "@nestjs/mongoose";

export type PurchaseLogDocument = PurchaseLog & Document;

@Schema()
export class PurchaseLog{}

export const PurchaseLogSchema = SchemaFactory.createForClass(PurchaseLog);