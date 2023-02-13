import { admins } from "../imtihon/model.js";
import jwt from "jsonwebtoken";
import { Router } from "express";
const route=Router()
const {sign,verify}=jwt
let SECRET_KEY='secret'
let {adminId,username}=admins
let adminToken=sign({adminId,username},SECRET_KEY)

route.post('/admin',(req,res)=>{
    const {adminId,password}=req.body
    const admin=admins.map(admin=>{
        if(admin.adminId == adminId && admin.password==password){
            res.send({succes:admin,message:'successfully',token:adminToken})
        }else{
            res.send({status:400,message:'not found this admin'})
        }
    })
})




export default route