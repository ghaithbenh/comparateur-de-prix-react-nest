import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, collection: 'TousProduits' })
export class Products extends Document {
  @Prop()
  title: string;

  @Prop()
  imgSRC: string;

  @Prop()
  link: string;

  @Prop()
  price: number;

  @Prop()
  manufacturer: string;

  @Prop()
  product: string;
}
export const AllProductsSchema = SchemaFactory.createForClass(Products);
