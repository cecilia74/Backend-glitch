import { Server } from 'socket.io';
import { MsgModel } from "../DAO/models/msgs.model.js"
export function connectSocketServer(httpServer) {

const socketserver = new Server(httpServer);

socketserver.on("connection", (socket) => {
    console.log(`New clinet: ${socket.id}`);

    socket.on("new-product", async (title, description, price, thumbnail, code, stock) => {
        try {
            await appManager.addProduct({ title, description, price, thumbnail, code, stock });

            const productsList = await appManager.getProducts();
            console.log(productsList);
            socketserver.emit("products", productsList);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on("delete-product", async (productId) => {
        try {
            appManager.deleteProduct(productId);

            const productsList = await appManager.getProducts();
            console.log(productsList);
            socketserver.emit("products", productsList);
        } catch (err) {
            console.log(err);
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
} catch(err) {
console.log(err)
}


    });
});
}