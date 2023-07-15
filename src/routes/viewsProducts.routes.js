import express from "express";
import { ProductServise } from "../services/products.service.js";
import { CartServise } from "../services/carts.service.js";
import { ProductsModel } from "../DAO/models/products.model.js";
export const viewsRouter = express.Router();







viewsRouter.get('/', async (req, res) => {
    try{
        const { limit = 10, page = 1, sort, query } = req.query;
        const queryParams = { limit, page, sort, query };
        const products = await ProductServise.get(queryParams);
        return res.status(200).render('home', {products});
    }catch(err){
        console.error(err);
        return res.status(500).json({status: "error", msg: "Error in server", products:{}})
    }
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try{
        const products = await ProductServise.get();
        return res.status(200).render('realtimeproducts', {products});
    }catch(err){
        return res.status(500).json({status: "error", msg: "Error in server", products:{}})
    }
});

viewsRouter.get('/products', async (req, res) => {
    try {
        const {limit = 10, page = 1, sort, query} = req.query;
        const queryParams = {limit, page, sort, query};
        const {
            payload: products,
            totalPages,
            payload,
            prevPage,
            nextPage,
            page: currentPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        } = await ProductServise.get(queryParams);
        let productsSimplified = products.map((item) => {
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
        return res.render('products', {
            products: productsSimplified,
            totalPages,
            prevPage,
            nextPage,
            currentPage,
            hasPrevPage,
            hasNextPage,
            prevLink: prevLink?.substring(4) || "",
            nextLink: nextLink?.substring(4) || "",
        });
    } catch (error) {
        return res.status(500).json({status: 'error', message: 'Error in server'});
    }
});

viewsRouter.get("/products/:pid", async (req, res, next) => {
    try {
        const {pid} = req.params;
        const product = await ProductsModel.findById(pid);
        const productSimplified = {
            _id: product._id.toString(),
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            category: product.category,
        };
        res.render('product', {product: productSimplified});
    } catch (error) {
        next(error);
    }
});

viewsRouter.get('/carts/:cid', async (req, res, next) => {
    try {
        const {cid} = req.params;
        const cart = await CartServise.get(cid);
        const simplifiedCart = cart.products.map((item) => {
            return {
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
            };
        });
        res.render('cart', {cart: simplifiedCart});
    } catch (error) {
        next(error);
    }
});

viewsRouter.get('/login', async (req, res) => {
    res.render('login');
});




viewsRouter.get("/aproducts", async (req, res) => {
    try {
        const queryParams = req.query;
        const response = await ProductServise.getAll(queryParams);
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
            msg: error,
            payload: {},
        });
    }
});


