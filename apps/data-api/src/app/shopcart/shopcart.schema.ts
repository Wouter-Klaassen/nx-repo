import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ShopcartDocument = Shopcart & Document;

@Schema()
export class Shopcart{
    
    @Prop({
        required: true,
      })
    productIds: string[];
    
    @Prop({
      required: true,
    })
    products: string[];
      
    @Prop({
        required: true,
      })
      userId: string;

      
    @Prop({
        required: true,
      })
      priceTotal: number;
}

export const ShopcartSchema = SchemaFactory.createForClass(Shopcart);