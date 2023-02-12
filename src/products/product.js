import { Router } from "express";
import { read } from "../upload/upload.js";

const route = Router();

route.get("/product", (req, res) => {
  const { categoryId, subCategoryId, model } = req.query;
  const subCategory = read("subcategory");
  console.log(subCategory);
  if (categoryId) {
    let filter = subCategory.filter((sub) => sub.category_id == categoryId);
    return res.json(filter);
  }
  if (subCategory || model) {
    let filter = subCategory.map((sub) => {
     return sub.product.filter((e) => {
        const bySubCategory = subCategoryId
          ? e.sub_category_id == subCategoryId
          : true;
        const byModel = model ? e.model == model : true;
        console.log(bySubCategory, byModel);
        return bySubCategory && byModel;
      });
    });
    console.log(filter);
    res.json(filter);
  }
});

export default route;
