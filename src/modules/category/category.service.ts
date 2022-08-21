import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schema/category';
import { Product, ProductDocument } from 'src/schema/product';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Category.name) private CATEGORY: Model<CategoryDocument>,
    @InjectModel(Product.name) private PRODUCT: Model<ProductDocument>
  ) { }

  create(category: CreateCategoryDto) {
    return this.CATEGORY.create(category)
  }

  async findAll() {
    return {
      categories: await this.CATEGORY.find({
        parent: { $exists: false }
      }).exec(),
      count: await this.CATEGORY.count()
    }
  }

  async findOne(id: string) {
    const children = await this.CATEGORY.find({ parent: id })
    const category = await this.CATEGORY.findById(id)
    const cat_count = await this.CATEGORY.count()
    // const counts = await this.getProductCount(children.map(ch => ch._id))
    return {
      category,
      children,
      count: cat_count
    }
  }


  async getProductCount(ides: string[]) {
    const counts = await Promise.all(
      ides.map(async (id) => (
        await this.PRODUCT.where({ category: id }).countDocuments()
      ))
    )
    return Promise.resolve(counts)
  }


}
