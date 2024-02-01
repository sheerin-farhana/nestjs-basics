import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getAllProducts() {
        return [...this.products];
    }

    getSingleProduct(id: string) {
        const product = this.findProduct(id)[0];
        return product;
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updateProduct = { ...product };
        if (title) {
            updateProduct.title = title;
        }
        if (desc) {
            updateProduct.description = desc;
        }
        if (price) {
            updateProduct.price = price;
        }

        this.products[index] = updateProduct;

        return updateProduct;
    }

    deleteProduct(id: string) {
        const [_, index] = this.findProduct(id);
        this.products.splice(index, 1);
        return this.products;
    }

    private findProduct(id: string): [Product,number]{
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException("product not found");
        }
        return [product,productIndex];
    }
}