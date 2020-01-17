 const mongodb=require("mongodb");
 const MongoClient=mongodb.MongoClient;
 const xpath=require("xpath");
 const MySQl=require("mysql2");
 const Mymodel=require("../models/My_model");
 const MyQueue=[];
const  addQueue=(req,res)=>{
   res.writeHead(200,"Acknowledged");
   res.write("Acknowledged");
   MyQueue.push("added inside Queue Employee Info  of"+req.body.name+" ID:"+req.body.id);
   res.setTimeout(5000);
   return;
}
const GetQueue=(req,res)=>{
    res.writeHead(200,"Acknowledge");
    res.write("Acknowledged");
    MyQueue.push("Fetched all employee data");
    res.setTimeout(5000);
    return;
 }
 const GetOneQueue=(req,res)=>{
    res.writeHead(200,"Acknowledge");
    res.write("Acknowledged");
    MyQueue.push("Fetched Single employee data name");
    res.setTimeout(5000);
    return;
 }
 const UpdateOneQueue=(req,res)=>{
    res.writeHead(200,"Acknowledged");
    res.write("Acknowledged");
    MyQueue.push("updated  Single employee data name");

}
 const DeleteOneQueue=(req,res)=>{

 }
export const JsonOperations={
   
  Post(req,res){
     addQueue(req,res);
     Mymodel.save(req,res);
     res.end();
   },
   Get(req,res){
   
   },
   GetOne(req,res){
  
   },
   DeleteOne(req,res){
   
   },
   UpdateOne(req,res){
      
   } 

}