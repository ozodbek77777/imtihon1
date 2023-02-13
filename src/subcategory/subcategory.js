import { Router } from "express";
import { write, read } from "../upload/upload.js";
import { subCategories, products } from "../imtihon/model.js";

const route = Router();

route.get("/subcategory", (req, res) => {
  let subcategory = read("subcategory");
  const subCategory = subCategories.map((category) => {
    category.product = products.filter(
      (product) => product.sub_category_id == category.sub_category_id
    );
  });
  subcategory = subcategory.filter((e) =>
    e.product.filter((sub) => delete sub.sub_category_id)
  );
  write("subcategory", subCategories);
  res.json(subcategory);
});
route.post("/subcategory", (req, res) => {
  const { category_id, sub_category_name } = req.body;
  let subcategory = read("subcategory");

  let find = subcategory.find(
    (sub) => sub.sub_category_name == sub_category_name
  );
  let newSubCategory = {
    sub_category_id: subcategory.at(-1).sub_category_id + 1,
    sub_category_name: sub_category_name,
    category_id: category_id,
  };
  if (!find) {
    subcategory.push(newSubCategory);
    write("subcategory", subcategory);
    res.sendStatus(201).send({ status: 201, message: 'aded' });
  }
});
route.delete('/subcategory/:id',(req,res)=>{
  let {token}=req.headers
  let {id}=req.params
  let subcategory=read('subcategory')
  if(token){
    const findIndex=subcategory.findIndex(e=>e.sub_category_id==id)
    console.log(findIndex);
    if(findIndex ==-1){
    res.sendStatus({status:400,message:'not found this item'})
    }
    subcategory.splice(findIndex,1)
    write('subcategory',subcategory)
    res.send({status:200,messageL:'successfully delteted'})
  }else{
    res.send({status:400, message:'token not working'})
  }
})

export default route;
