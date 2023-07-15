import { Server } from 'socket.io';
import { MsgModel } from "../DAO/models/msgs.model.js"
import { ProductsModel } from '../DAO/models/products.model.js';
import ProductManager from '../DAO/functions/ProductManager.js';
import { ProductServise } from '../services/products.service.js';
export function connectSocketServer(httpServer) {

    const socketserver = new Server(httpServer);

    // PRODUCTS
    socketserver.on("connection", async (socket) => {
        console.log(`New clinet: ${socket.id}`);

        try {
            const allProducts = await ProductsModel.find({});
            socket.emit("products", allProducts);
        } catch (e) {
            console.log(e);
        }
        socket.on("new-product", async newProd => {
            try {
                if (
                    !newProd.title ||
                    !newProd.description ||
                    !newProd.category ||
                    !newProd.price ||
                    !newProd.code ||
                    !newProd.stock
                ) {
                    console.log('Please complete all forms');
                    return;
                }
                const productsList = await ProductsModel.find({});
                console.log(productsList);
                socketserver.emit("products", productsList);
            } catch (err) {
                console.log(err);
            }
        });

        socket.on("delete-product", async (productId) => {
            try {
                ProductsModel.deleteOne({_id:productId});

                const productsList = await ProductsModel.find({});
                console.log(productsList);
                socketserver.emit("products", productsList);
            } catch (err) {
                console.log(err);
            }
        });
            // CARTS
        socket.on('addToCart', async (entries) => {
            const product = await ProductServise.createOne(entries);
            socketserver.emit('addedProduct', product)
            })
        socket.on("productModified", async (id, newProd) => {
            try {
                console.log(id);
                console.log(newProd);
                await ProductsModel.findOneAndUpdate({ _id: id }, newProd);
                const prod = await ProductsModel.find({});
                socketserver.emit("products", prod);
            } catch (e) {
                console.log(e);
            }
        });
        socket.on("msg_front_to_back", async (msg) => {
            try {
                await MsgModel.create(msg);
            } catch (err) {
                console.log(err)
            }

            try {
                const msgs = await MsgModel.find({})
                socketserver.emit("listado_de_msgs", msgs)
            } catch (err) {
                console.log(err)
            }


        });




    });
}