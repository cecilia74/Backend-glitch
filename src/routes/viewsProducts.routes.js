import express from "express";
import { productService } from "../services/products.service.js";
export const viewsRouter = express.Router();

viewsRouter.get("/products", async (req, res) => {
    try {
        const queryParams = req.query;
        const response = await productService.getAll(queryParams);
        const products = response.payload;
        let productSimplified = products.map((item) => {
            return {
                _id: item._id.toString(),
                title: item.title,
                description: item.description,
                price: item.price,
                thumbnail: item.thumbnail,
                code: item.code,
                stock: item.stock,
                category: item.category,
            };
        });
        return res
            .status(200)
            .render("products", { products: productSimplified, style: "main.css" });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: msg.error,
            payload: {},
        });
    }
});