import express from 'express';
import { CartServise } from '../services/carts.service.js';

export const cartRouter = express.Router();


cartRouter.get("/", async (req, res) => {

    try {
        const get = await CartServise.getAll();
        if (get) {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Found all products",
                data: get,
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

cartRouter.get("/:cid", async (req, res) => {

    try {
        const cart = req.params.cid;
        const get = await CartServise.getOne(cart);
        if (cart) {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Cart found",
                data: get,
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


cartRouter.post("/", async (req, res) => {
    try {
        const postbody = await CartServise.createCart();
            res.status(200).json({
                status: "SUCCESS",
                msg: "Product added",
                data: postbody,
            })
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});


cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid,pid } = req.params;
        const postbody = await CartServise.addToCart(cid, pid);
        console.log(cid,pid);
        if (!cid) {
            return res.status(404).json({ message: `Cart doesn't exist` });
        } else if (!pid) {
            return res.status(404).json({ message: `Product doesn't exist` });
        } else {

            res.status(200).send({
                status: "SUCCESS",
                msg: "Product added",
                data: postbody,
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

cartRouter.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const cart = await CartServise.updateCart(cid, products);
        res
            .status(200)
            .json({ status: "success", message: "Cart updated successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

cartRouter.put("/:cid/procuct/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const changeQuantity = await CartServise.updateQuantity(cid, pid, quantity)
        if (!cid) {
            return res.status(404).json({
                status: "ERROR",
                msg: `Cart doesn't exist`,
                data: {},
            });
        } else if (!pid) {
            return res.status(404).json({
                status: "ERROR",
                msg: `Product doesn't exist`,
                data: {},
            });
        } else {
            res.status(200).send({
                status: "SUCCESS",
                msg: "Product changed",
                data: changeQuantity,
            })
        }
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            msg: "Found 0 products",
            data: {},
        })
    }
});

cartRouter.delete(":cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const deleteCart = await CartServise.deleteCart(cid)
        res.status(200).send({
            status: "SUCCESS",
            msg: "Found all products",
            data: deleteCart,
        })
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            msg: "Product not deleted",
            data: {},
        })
    }
});



