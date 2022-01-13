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

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

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

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
