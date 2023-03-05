import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';


export type IdentityDocument = Identity & Document;


@Schema(
)
export class Identity{

}
export const IdentitySchema = SchemaFactory.createForClass(Identity);
