import {Router}  from "express"



const route=Router()

route.get('/product',(req,res)=>{
    res.send([])
})
route.get('/product',(req,res)=>{
    const {categoyId,subCategotyId,model}=req.query
})

export default route