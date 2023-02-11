import { Router } from "express";
import { write } from "../upload/upload.js";
import { subCategories, products } from "../imtihon/model.js";

const route = Router();

route.get("/subcategory", (req, res) => {
  const subCategory = subCategories.map((category) => {
    category.product = products.filter(
      (product) => product.sub_category_id == category.sub_category_id
    );
  });
  write("subcategory", subCategories);
  console.log(subCategories);
  res.json(subCategories);
});
export default route