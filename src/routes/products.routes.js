
import express from 'express';
import { ProductServise } from '../services/products.service.js';
export const productsRouter = express.Router();
import { CartServise } from '../services/carts.service.js';

productsRouter.get("/", async (req, res) => {

    try {
        const queryParams = req.query;
        // const queryParams = {limit, page, sort, query};
        const {
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: currentPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        } = await ProductServise.getAllWithPagination(queryParams);
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
            prevLink,
            nextLink,
        });
    } catch (error) {
        return res.status(500).json({status: 'error', message: 'Error in server'});
    }

})


productsRouter.get("/:pid", async (req, res) => {

    try {
        let { pid } = req.params;
        let idEncontrado = await ProductServise.getOne(pid);
        if (idEncontrado) {
            res.status(200).render("products",{idEncontrado})
            // send({
            //     status: "SUCCESS",
            //     msg: "Product found.",
            //     data: idEncontrado,
            // });
        }
        else {
            res.status(400).json({
                status: "ERROR",
                msg: "Product doesn't exist",
                data: {},
            })
        }

    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Please complete all forms");
            return res.status(400).json({
                status: "error",
                msg: "Please complete all forms",
                payload: {},
            });
        }
        const newprod = await ProductServise.createOne({ title, description, price, thumbnail, code, stock });
        console.log(newprod);
        if (newprod) {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Product added.",
                data: newprod,
            });
        } else {
            res.status(400).json({
                status: "ERROR",
                msg: "Product not added",
                data: {},
            })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});


productsRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body;
        let putid = await ProductServise.updateOne(pid, body);
        if (putid) {
            return res
                .status(200)
                .json({
                    status: "SUCCESS",
                    msg: "Product modified.",
                    data: putid,
                })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});


productsRouter.delete("/:pid", async (req, res) => {

    try {
        let { pid } = req.params;
        let deleid = await ProductServise.deleteOne(pid);
        if (deleid) {
            return res
                .status(200)
                .json({
                    status: "SUCCESS",
                    msg: "Product eleminated.",
                    data: {},
                })
        }
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});

productsRouter.get('/carts/:cid', async (req, res, next) => {
    try {
        const {cid} = req.params;
        const cart = await CartServise.getOne(cid);
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


