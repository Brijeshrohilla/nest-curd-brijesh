import {
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // POST create product
  @Post()
  async addProduct(
    @Body('price') prodPrice: number,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

  // GET get all products
  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  // GET single product
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  // PUT update product
  @Put(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('price') prodPrice: number,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
  ) {
    const updatedId = await this.productsService.updateProduct(prodDesc, prodTitle, prodPrice, prodId);
    return { id: updatedId };
  }

  // DELETE delete product
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
