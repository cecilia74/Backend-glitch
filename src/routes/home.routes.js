import express  from "express";
import ProductManager from "../DAO/functions/ProductManager.js";

export const home = express.Router();

const manager = new ProductManager('../data/Products.json');

home.get("/", async (req, res) => {

    try {
        const { limit } = req.query;
        const products = await manager.getProducts();
        if (limit) {
            const limitprod = products.slice(0, parseInt(limit))
            res.status(200).render("home",{limitprod});

        } else {
            res.status(200).render("home",{products});
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

