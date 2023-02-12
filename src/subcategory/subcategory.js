import { Router } from "express";
import { write,read } from "../upload/upload.js";
import { subCategories, products } from "../imtihon/model.js";

const route = Router();

route.get("/subcategory", (req, res) => {
   let subcategory=read('subcategory') 
  const subCategory = subCategories.map((category) => {
    category.product = products.filter(
      (product) => product.sub_category_id == category.sub_category_id
    );
  });
  subcategory=subcategory.filter(e=>e.product.filter(sub=> delete sub.sub_category_id))
  write("subcategory", subCategories);
  res.json(subcategory);
});
export default route