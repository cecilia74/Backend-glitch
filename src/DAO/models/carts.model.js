import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const CartsModel = model(
    "carts",
    new Schema({
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: "products", required: true },
                quantity: { type: Number, default: 1 },
            },
        ],
    })
);

CartsModel.plugin(mongoosePaginate);