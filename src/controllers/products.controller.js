import { productsColletion } from "../database/db.js";

export async function getProducts(req, res) {
    const products = await productsColletion.find().toArray();
    res.status(200).send(products);
}