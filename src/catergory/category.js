import { Router } from "express";
import { categories, subCategories } from "../imtihon/model.js";
import { read, write } from "../upload/upload.js";

const route = Router();

route.get("/category", (req, res) => {
  const categories1 = categories.map((category) => {
    category.subCategories = subCategories.filter(
      (sub) => sub.category_id == category.category_id
    );
  });
  let category = read("category");
  category = category.filter((c) =>
    c.subCategories.filter((sub) => delete sub.category_id)
  );
  write("category", categories);
  res.json(category);
});
route.get("/category/:id", (req, res) => {
  const { id } = req.params;
  let category = read("category");
  category = category.filter((c) =>
  c.subCategories.filter((sub) => delete sub.category_id)
);
  let find = category.find((c) => c.category_id == id);

  res.json(find);
});
export default route;
