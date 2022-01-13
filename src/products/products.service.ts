import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) { }

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      price,
      description: desc,
    });

    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find({});
    return products.map(data => ({
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
    }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
    };
  }

  async updateProduct(
    desc: string,
    title: string,
    price: number,
    productId: string,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) { updatedProduct.title = title; }
    if (price) { updatedProduct.price = price; }
    if (desc) { updatedProduct.description = desc; }
    const result = await updatedProduct.save();
    return result.id as string;
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Not Found !!');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Not Found !!');
    }
    if (!product) {
      throw new NotFoundException('Not Found !!');
    }
    return product;
  }
}
