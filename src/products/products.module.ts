import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductService } from "./products.servive";




@Module({
    controllers: [ProductsController],
    providers:[ProductService],
})
export class ProductsModule{}