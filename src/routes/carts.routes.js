import express from 'express';
import CartManager from '../DAO/functions/CartManager.js';
import { CartServise } from '../services/carts.service.js';

export const cartRouter = express.Router();

const newCartManager = new CartManager('../data/Carts.json');


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

cartRouter.get("/:cid",async (req, res) => {

    try {
        const cart = req.params.cid;
        const get = newCartManager.getCartById(cart);
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


cartRouter.post("/",async (req, res) => {
    try {
        const postbody = CartServise.createCart();
        if (postbody) {
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


cartRouter.post("/:cid/product/:pid", async(req, res) => {
    try {
        const postc = req.params.cid;
        const postp = req.params.pid;
        const postbody = await CartServise.addToCart(postc, postp);

        if (!postc) {
            return res.status(404).json({ message: `Cart doesn't exist` });
        } else if (!postp) {
            return res.status(404).json({ message: `Product doesn't exist` });
        } else {

        res.status(200).send({
            status: "SUCCESS",
            msg: "Product added",
            data: postbody,
        })}
    } catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }
});



cartRouter.put("/:cid/procuct/:pid",async (req,res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const changeQuantity = await CartServise.updateQuantity(cid,pid)
        if (!cid) {
            return res.status(404).json({ message: `Cart doesn't exist` });
        } else if (!pid) {
            return res.status(404).json({ message: `Product doesn't exist` });
        } else {
        res.status(200).send({
            status: "SUCCESS",
            msg: "Product changed",
            data: changeQuantity,
        })}
    } catch (err) {
        res.status(400).send({
            status: "ERROR",
            msg: "Found 0 products",
            data: {},
        })
    }
});

cartRouter.delete(":cid", async (req,res) => {
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



