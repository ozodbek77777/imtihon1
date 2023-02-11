import express from "express";
import route from "./catergory/category.js";

const app = express();
app.use(express.json());
app.use(route);

app.listen(9000, console.log("code run"));
