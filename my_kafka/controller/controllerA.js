const controllerB=require("../controller/controllerB");
const postData=(req,res)=>{
    if(req.is('application/xml')){
       controllerB.XmlOperation.Post(req,res);
    }
    if(req.is("json")){
        controllerB.JsonOperation.Post(req,res);
    }
}
const getData=(req,res)=>{
    if(req.is('application/xml')){
       controllerB.XmlOperation.Get(req,res);
    }
    if(req.is("json")){
        controllerB.JsonOperation.Get(req,res);
    }
}
const getOne=(req,res)=>{
    if(req.is('application/xml')){
       controllerB.XmlOperation.GetOne(req,res);
    }
    if(req.is("json")){
        controllerB.JsonOperation.GetOne(req,res);
    }
}

const deleteData=(req,res)=>{
    if(req.is('application/xml')){
       controllerB.XmlOperation.Delete(req,res);
    }
    if(req.is("json")){
        controllerB.JsonOperation.Delete(req,res);
    }
}

const updateData=(req,res)=>{
    if(req.is('application/xml')){
       controllerB.XmlOperation.Update(req,res);
    }
    if(req.is("json")){
        controllerB.JsonOperation.Update(req,res);
    }
}
module.exports={
    deleteData:deleteData,
    updateData:updateData,
    getOne:getOne,
    getData:getData,
    postData:postData
}