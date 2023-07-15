import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";



const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },  
  thumbnail: { type: String, required: true },  
  code: { type: String, unique: true, required: true, max: 100 },
  stock: { type: Number, required: true },
  category: { type: String, required: false, max: 100 },
});
schema.plugin(mongoosePaginate);
export const ProductsModel = model("products", schema);
