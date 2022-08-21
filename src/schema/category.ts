import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';



export type CategoryDocument = Category & mongoose.Document;

@Schema()
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    parent?: Category;

}

export const CategorySchema = SchemaFactory.createForClass(Category);