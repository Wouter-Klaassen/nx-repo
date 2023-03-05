import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import isEmail from 'validator/lib/isEmail';


export type UserDocument = User & Document;


@Schema(
)
export class User{

}
export const UserSchema = SchemaFactory.createForClass(User);
