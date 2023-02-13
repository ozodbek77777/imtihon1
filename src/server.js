import express from "express";
import category from "./catergory/category.js";
import subcategory from "./subcategory/subcategory.js"
import product from "./products/product.js"
import admin from './checkToken/checkAdminToken.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(category);
app.use(subcategory);
app.use(product);
app.use(admin)


app.listen(9000, console.log("code run"));
