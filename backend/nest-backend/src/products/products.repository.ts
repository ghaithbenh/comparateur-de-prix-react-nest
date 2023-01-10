import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/schemas/products.schema';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Products.name) private readonly productModel: Model<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<Products> {
    return this.productModel.findOne({ _id: id });
  }

  async findByproduct(product: string): Promise<Products[]> {
    return this.productModel.find({
      product: product,
    });
  }
  async findByManufacturer(manufacturer: string): Promise<Products[]> {
    return this.productModel.find({
      manufacturer: manufacturer,
    });
  }
  async findByPrice(price: number): Promise<Products[]> {
    return this.productModel.find({
      price: price,
    });
  }
}
