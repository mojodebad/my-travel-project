const controllerB=require("../controller/controllerB");
const postData=(req,res)=>{
    if(req.is("json")){
        controllerB.JsonOperation.Post(req,res);
    }
}
const getData=(req,res)=>{

    if(req.is("json")){
        controllerB.JsonOperation.Get(req,res);
    }
    else{
        res.status(400).send("please send it in a proper form");
    }
}
const getOne=(req,res)=>{
 
    if(req.is("json")){
        controllerB.JsonOperation.GetOne(req,res);
    }
    else{
        res.status(400).send("please send it in a proper form");
    }
}

const deleteData=(req,res)=>{
    if(req.is("json")){
        controllerB.JsonOperation.Delete(req,res);
    }
    else{
        res.status(400).send("please send it in a proper form");
    }
}

const updateData=(req,res)=>{
    if(req.is("json")){
        controllerB.JsonOperation.Update(req,res);
    }
    else{
        res.status(400).send("please send it in a proper form");
    }
}

module.exports={
    deleteData:deleteData,
    updateData:updateData,
    getOne:getOne,
    getData:getData,
    postData:postData
}