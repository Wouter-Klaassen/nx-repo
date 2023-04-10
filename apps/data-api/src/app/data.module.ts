import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./auth/user/user.controller";
import { User, UserSchema } from "./auth/user/user.schema";
import { UserService } from "./auth/user/user.service";
import { ProductController } from "./product/product.controller";
import { Product, ProductSchema } from "./product/product.schema";
import { ProductService } from "./product/product.service";
import { PurchaseLogController } from "./purchase_log/purchase_log.controller";
import { PurchaseLog, PurchaseLogSchema } from "./purchase_log/purchase_log.schema";
import { PurchaseLogService } from "./purchase_log/purchase_log.service";
import { ReviewController } from "./review/review.controller";
import { Review, ReviewSchema } from "./review/review.schema";
import { ReviewService } from "./review/review.service";
import { ShopcartController } from "./shopcart/shopcart.controller";
import { Shopcart, ShopcartSchema } from "./shopcart/shopcart.schema";
import { ShopcartService } from "./shopcart/shopcart.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Product.name, schema: ProductSchema },
            {name: PurchaseLog.name, schema: PurchaseLogSchema},
            {name: Review.name, schema: ReviewSchema},
            {name: Shopcart.name, schema: ShopcartSchema},
            {name: User.name, schema: UserSchema}
        ]),
    ],
    controllers:[
        ReviewController,
        PurchaseLogController,
        ProductController,
        ShopcartController,
        UserController
    ],
    providers:[
        ReviewService,
        PurchaseLogService,
        ProductService,
        ShopcartService,
        UserService
    ]
})
export class DataModule{}