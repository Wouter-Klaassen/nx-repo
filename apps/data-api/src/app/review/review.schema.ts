import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ReviewDocument = Review & Document;

@Schema()
export class Review{

    
    @Prop({
        required: true,
      })
      userId: string;
    @Prop({})
      username:string;
    
    @Prop({
        required: true,
      })
      productId: string;

      
    @Prop({
        required: true,
      })
      ratingOutOfTen: number;

      
    @Prop({
        required: true,
      })
      text: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);