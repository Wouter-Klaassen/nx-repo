import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Neo4jConnection } from "@nx-repo/data";
import { hash, compare } from 'bcrypt';
import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { Model } from "mongoose";
import { Neo4jService } from "../neo4j/neo4j.service";
import { NeoQueries } from "./auth.cypher";
import { Identity, IdentityDocument } from "./identity.schema";
import { User, UserDocument } from "./user/user.schema";


@Injectable()
export class AuthService{
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly neo4jService: Neo4jService
    ) {}

    async createUser(name: string, emailAddress: string, roles: string[]){
        const user = new this.userModel({name, emailAddress, roles});
        await user.save();
        return user;
    }

    async registerUser(username, password, emailAdress){
        const generatedHash = await hash(password, parseInt(process.env.SALT_ROUNDS, 10));

        const identity = new this.identityModel({username, hash: generatedHash, emailAdress})
        console.log(identity);
        
        await identity.save()
    }

    async createNode(id:string){
        await this.neo4jService.singleWrite( NeoQueries.addNode ,{id})
    }

    async verifyToken(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) reject(err);
                else resolve(payload);
            })
        })
    }

    async generateToken(username: string, password: string): Promise<string> {
        const identity = await this.identityModel.findOne({username});

        if (!identity || !(await compare(password, identity.hash))) throw new Error("user not authorized");

        const user = await this.userModel.findOne({name: username});

        return new Promise((resolve, reject) => {
            sign({username, id: user.id}, process.env.JWT_SECRET, (err: Error, token: string) => {
                if (err) reject(err);
                else resolve(token);
            });
        })
    }
}