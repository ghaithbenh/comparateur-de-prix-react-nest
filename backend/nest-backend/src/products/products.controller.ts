import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { Public } from 'src/common/decorators';
import { ProductsRepository } from './products.repository';

@Public()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsRepository: ProductsRepository) {}

  @Get('')
  async getAllProducts() {
    return this.productsRepository.findAll();
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    return this.productsRepository.findOne(id);
  }

  @Get('product/:product')
  async getOneProductByProduct(@Param('product') product: string) {
    return this.productsRepository.findByproduct(product);
  }

  @Get('manufacturer/:manufacturer')
  getproductByManufacturer(@Param('manufacturer') manufacturer: string) {
    return this.productsRepository.findByManufacturer(manufacturer);
  }

  @Get('price/:price')
  getproductByPrice(@Param('price') price: number) {
    return this.productsRepository.findByPrice(price);
  }
}
