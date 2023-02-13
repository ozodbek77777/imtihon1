import { Router } from "express";
import { read, write } from "../upload/upload.js";

const route = Router();

route.get("/product", (req, res) => {
  const { categoryId, subCategoryId, model } = req.query;
  const subCategory = read("subcategory");
  if (!(categoryId || subCategoryId || model)) {
    res.send([]);
  }
  if (categoryId) {
    let filter = subCategory.filter((sub) => sub.category_id == categoryId);
    console.log(filter);
    return res.json(filter);
  }
  if (subCategory || model) {
    let filter = subCategory.map((sub) => {
      return sub.product.filter((e) => {
        const bySubCategory = subCategoryId
          ? e.sub_category_id == subCategoryId
          : true;
        const byModel = model ? e.model == model : true;
        return bySubCategory && byModel;
      });
    });
    res.json(filter);
  }
  res.send("ok");
});
route.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const subCategory = read("subcategory");
  let filter = subCategory.map((sub) => {
    return sub.product.filter((e) => e.product_id == id);
  });
  res.json(filter);
});
route.post("/product", (req, res) => {
  const { subCategoryId, productName, price, color, model } = req.body;
  const subCategory = read("subcategory");
  let find2 = subCategory.find((e) => e.sub_category_id == subCategoryId);
  let at = subCategory.map((e) => e.product.at(-1).product_id);
  let biggest = Math.max(...at);
  if (subCategory) {
    biggest = biggest + 1;
  }
  let addProduct = {
    product_id: biggest,
    productName,
    price,
    color,
    model,
  };
  if (find2) {
    find2.product.push(addProduct);
    write("subcategory", subCategory);
    res.sendStatus(200);
  } else {
    res.send({ status: 400, message: "this subcategory not found" });
  }
});
route.delete("/product/:id", (req, res) => {
  let { token } = req.headers;
  let { id } = req.params;
  let subcategory = read("subcategory");

  if (token) {
 subcategory.map((sub) => {
      return sub.product= sub.product.filter((e) => {
          return e.product_id !== Number(id); 
      });
    });
    write('subcategory',subcategory)
    
    res.send({status:200,message:'success'})
  } else {
    res.send({ status: 400, message: "token not found" });
  }
});

route.put('/product/:id/:productName',(req,res)=>{
  let { token } = req.headers;
  let { id,productName } = req.params;
  let subcategory = read("subcategory");

  if (token) {
 subcategory.map((sub) => {
      return sub.product.filter((e) => {
           if(e.product_id ==id){
           return e.product_name=productName
           }
      });
    });
    write('subcategory',subcategory)
    
    res.send({status:200,message:'success'})
  } else {
    res.send({ status: 400, message: "token not found" });
  }
})
export default route;
