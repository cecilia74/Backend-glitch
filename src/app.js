import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import ProductManager from './DAO/functions/ProductManager.js';
import { _dirname } from './config.js';
import { cartRouter } from './routes/carts.routes.js';
import { chatRouter } from './routes/chat.routes.js';
import { home } from './routes/home.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { realtime } from "./routes/realtimeproducts.routes.js";
import { usersRouter } from './routes/users.routes.js';
import { viewsRouter } from './routes/viewsProducts.routes.js';
import { connectMongo } from './utils/dbConnecton.js';
import { connectSocketServer } from "./utils/socketServer.js";



const app = express();
const PORT = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartRouter)


// DEVOLVER HTML

app.use("/", home);
app.use("/", viewsRouter);

app.use("/realtimeproducts", realtime)

//CHAT

app.use("/chat", chatRouter)

app.get("*", (req, res) => {
    res.send(console.log(`Welcome to my humble page.`))
})


// CONFIG DEL MOTOR DE PLANTILLAS

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(_dirname, "views"));
app.set("view engine", "handlebars");


// SERVER

const httpServer = app.listen(PORT, () => {
    console.log(`Example app listening http://localhost:${PORT}`);
});

connectSocketServer(httpServer);
