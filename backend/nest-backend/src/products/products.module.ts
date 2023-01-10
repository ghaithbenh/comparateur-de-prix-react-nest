import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AllProductsSchema, Products } from 'src/schemas/products.schema';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: AllProductsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
