const express=require("express");
const app=express();
const routes=require("./routes/routesB");
const bodyparser=require("body-parser");
app.use(bodyparser.raw());
app.use(bodyparser.urlencoded({extended:false}));
app.use("/data",routes);
app.listen(8080,()=>{
    console.log("you are online");
});