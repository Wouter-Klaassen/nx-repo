import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductController } from "./product/product.controller";
import { Product, ProductSchema } from "./product/product.schema";
import { ProductService } from "./product/product.service";
import { PurchaseLogController } from "./purchase_log/purchase_log.controller";
import { PurchaseLog, PurchaseLogSchema } from "./purchase_log/purchase_log.schema";
import { PurchaseLogService } from "./purchase_log/purchase_log.service";
import { ReviewController } from "./review/review.controller";
import { Review, ReviewSchema } from "./review/review.schema";
import { ReviewService } from "./review/review.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Product.name, schema: ProductSchema },
            {name: PurchaseLog.name, schema: PurchaseLogSchema},
            {name: Review.name, schema: ReviewSchema}
        ]),
    ],
    controllers:[
        ReviewController,
        PurchaseLogController,
        ProductController,
    ],
    providers:[
        ReviewService,
        PurchaseLogService,
        ProductService,
    ]
})
export class DataModule{}