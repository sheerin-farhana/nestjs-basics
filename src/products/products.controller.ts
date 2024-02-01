import { Controller, Post,Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.servive";

@Controller('/products')
export class ProductsController {

    constructor(private readonly productsService: ProductService){}
    
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice:number,
    ):any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
        return { id: generatedId };
    }

    @Get()
    getProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProduct(
        @Param('id') id:string,
    ) {
        console.log(id);
        
        return this.productsService.getSingleProduct(id);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }

    @Delete(':id')
    deleteProduct(
        @Param('id') prodId:string
    ) {
        return this.productsService.deleteProduct(prodId);
    }
}