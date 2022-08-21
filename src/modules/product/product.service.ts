import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schema/product';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';



@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private PRODUCT: Model<ProductDocument>
  ) { }

  create(product: CreateProductDto) {
    return this.PRODUCT.create(product)
  }

  async findAll() {
    return {
      products: await this.PRODUCT.find().exec(),
      count: await this.PRODUCT.count()
    }
  }

  findOne(id: string) {
    return this.PRODUCT.findById(id)
  }


  async getProductsByCategory(id: string) {
    return {
      products: await this.PRODUCT.find({
        category: id
      }).exec(),
      count: await this.PRODUCT.where({ category: id }).countDocuments()
    }
  }

}
