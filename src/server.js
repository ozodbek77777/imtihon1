import express from "express";
import category from "./catergory/category.js";
import subcategory from "./subcategory/subcategory.js"
const app = express();
app.use(express.json());
app.use(category);
app.use(subcategory);

app.listen(9000, console.log("code run"));
