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
route.post("/category", (req, res) => {
  const category = read("category");
  const { category_name } = req.body;
  console.log(category_name);
  let find = category.find((c) => c.category_name == category_name);
  console.log(find);
  let newCategory = {
    category_id: category.at(-1).category_id + 1,
    category_name: category_name,
  };
  if (!find) {
    category.push(newCategory);
    write("category", category);
    res.sendStatus(201);
  } else {
    res.send("ok");
  }
});
route.delete("/category/:id", (req, res) => {
  let { token } = req.headers;
  let { id } = req.params;
  let category = read("category");
  if (token) {
    const findIndex = category.findIndex((e) => e.category_id == id);

    if (findIndex == -1) {
      res.sendStatus({ status: 400, message: "not found this item" });
    }
    category.splice(findIndex, 1);
    write("category", category);
    res.send({ status: 200, messageL: "successfully delteted" });
  } else {
    res.send({ status: 400, message: "token not working" });
  }
});
export default route;
