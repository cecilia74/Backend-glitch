import fs from 'fs';

export default class ProductManager {
    constructor() {
        this.path = ('./src/data/Products.json')
        this.products = [];
    }


    async addProduct(title, description, price, thumbnail, code, stock) {

        const newProducts = { title, description, price, thumbnail, code, stock }
        const prods = await this.getProducts();
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Product not added. Please complete again");
            return undefined
        } else if (prods.some((p) => p.code === code)) {
            console.log(`The code ${newProducts.code} has already been used. Please select another code`)
            return undefined;
        } else {
            prods.push({ id: prods.length ? prods[prods.length - 1].id + 1 : 1, ...newProducts });
            let productString = JSON.stringify(prods);
            fs.writeFileSync(this.path, productString);
        }

        return this.getProducts();
    }


    async getProducts() {
        let data = await fs.promises.readFile(this.path, "UTF-8")
        return JSON.parse(data)
    }


    async getProductById(id) {
        let data = await this.getProducts()
        return data.find(product => +product.id == +id)
    }

    async updateProduct(id, newtitle, newdescription, newprice, newthumbnail, newcode, newstock) {
        const produ = await this.getProducts();
        let productFound = produ.findIndex((product) => + product.id === +id)

        if (productFound === -1) {
            return null;
        }

        const update = {
            id,
            title: newtitle,
            description: newdescription,
            price: newprice,
            thumbnail: newthumbnail,
            code: newcode,
            stock: newstock,
        };

        produ[productFound] = update;
        fs.writeFileSync(this.path, JSON.stringify(produ));

    }


    deleteProduct(id) {
        let data = fs.readFileSync(this.path, "UTF-8")
        let dataParse = JSON.parse(data);
        let findId = dataParse.findIndex((prod) => parseInt(prod.id) === parseInt(id));
        if (findId === -1) {
            console.log("Id doesn't exist");
            return undefined;
        }

        dataParse.splice(findId, 1);
        fs.writeFileSync(this.path, JSON.stringify(dataParse))
        return `${id} was deleted`

    }
}


// const trial = new ProductManager();

// trial.addProduct('t-shirt', 'cosa', 836, 'imgen', '452342', '4');
// trial.addProduct('pants', 'cosabuena', 333, 'imgen', '6753', '6');
// trial.addProduct('ribbon', 'cosamala', 333, 'imgen', '5234', '2');
// trial.addProduct('u', 'cosamasomenosbuena', 653, 'imgen', '86663342', '62');
// trial.addProduct('hoyoverse', 'cosamasomenosmala', 11713, 'imgen', '11111', '3');
// trial.addProduct("producto actualizado", "Este es un producto actualizado", 300, "Imagen actualizada", "abc123", '30',);
// trial.addProduct('kk', 'cosamas', 63635, 'imgen', '32256', '3');
// trial.addProduct('bss', 'coss', 645562, 'imgen', '2282', '3');
// trial.addProduct('bts', 'cosamenos', 73425, 'imgen', '7362', '3');

