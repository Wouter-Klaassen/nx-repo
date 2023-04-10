import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Id } from "@nx-repo/data";

export type PurchaseLogDocument = PurchaseLog & Document;

@Schema()
export class PurchaseLog{
    @Prop({
        required: true,
    })
    userId: string;

    @Prop({
        required: true,
      })
    email: string;
    
    @Prop({
        required: true,
      })
    adress: string;

    
    @Prop({
        required: true,
      })
    products: string[];

    
    @Prop({
        required: true,
      })
      priceTotal: number;
}

export const PurchaseLogSchema = SchemaFactory.createForClass(PurchaseLog);