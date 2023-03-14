import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';


export type IdentityDocument = Identity & Document;


@Schema(
)
export class Identity{
    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop({required: true})
    hash: string;

    @Prop({
        required: true,
        unique: true,
        validate: {
          validator: isEmail,
          message: 'should be a valid email address',
        }
      })
    emailAdress: string;

}
export const IdentitySchema = SchemaFactory.createForClass(Identity);
