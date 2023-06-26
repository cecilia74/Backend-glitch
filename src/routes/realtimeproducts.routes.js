import express  from "express";
import ProductManager from "../DAO/functions/ProductManager.js";

export const realtime = express.Router();

const realTimeManager = new ProductManager('../data/Products.json');

realtime.get("/", async (req, res) => {

    try {
        const { limit } = req.query;
        const products = await realTimeManager.getProducts();
        if (limit) {
            const limitprod = products.slice(0, parseInt(limit))
            res.status(200).render("realtimeproducts",{limitprod});

        } else {
            res.status(200).render("realtimeproducts",{products});
        }
    }
    catch (err) {
        res.status(500).send({
            status: "ERROR",
            msg: err.message,
            data: {},
        })
    }

});

realtime.get("/:pid", async (req, res) => {

    try {
        let idid = req.params.pid;
        let idEncontrado = await realTimeManager.getProductById(idid);
        if (idEncontrado) {
            res.status(200).render("realtimeproducts",{idEncontrado});
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
