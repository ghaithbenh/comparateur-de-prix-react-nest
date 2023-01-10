import { ProductsRepository } from './products.repository';
import { Injectable } from '@nestjs/common';
import { Products } from 'src/schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findOne(id: string): Promise<Products> {
    return this.productsRepository.findOne(id);
  }

  async findByproduct(product: string) {
    return this.productsRepository.findByproduct(product);
  }

  async findByManufacturer(manufacturer: string) {
    return this.productsRepository.findByManufacturer(manufacturer);
  }

  async findByPrice(price: number) {
    return this.productsRepository.findByPrice(price);
  }
}
