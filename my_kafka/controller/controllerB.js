
const httpStatusCode = require("http-status-codes");
const Mymodel = require("../models/My_model");
const MyQueue = [];
const addQueue = (req, res) => {
   res.writeHead(200, "Acknowledged");
   res.write("Acknowledged");
   MyQueue.push("adding inside Queue Employee Info  of" + req.body.name + " ID:" + req.body.id + "status:Acknowledged");
 // res.setTimeoout(1000)
   return;
}
const GetQueue = (req, res) => {
   res.writeHead(200, "Acknowledge");
   res.write("Acknowledged");
   MyQueue.push("Fetched all employee data" + "status:acknowledged");
 // res.setTimeoout(1000)
   return;
}
const GetOneQueue = (req, res) => {
   res.writeHead(200, "Acknowledge");
   res.write("Acknowledged");
   MyQueue.push("Fetched Single employee data name");
 // res.setTimeoout(1000)
   return;
}
const UpdateOneQueue = (req, res) => {
   res.writeHead(200, "Acknowledged");
   res.write("Acknowledged");
   MyQueue.push("updated  Single employee data name");
 // res.setTimeoout(1000)
   return;
}
const DeleteOneQueue = (req, res) => {

}


const Post=(req,res)=>{
   addQueue(req,res);
   Mymodel.save(req,res);
   if (res.statusCode == 201) {
      MyQueue.push("added inside the Queue Employee Info of" + req.body.name + "ID:" + req.body.id + "status: done")
   }
   else {
      MyQueue.push("data not added for id:" + req.body.id + "name" + req.body.name + "status" + httpStatusCode.getStatusText(res.statusCode));
   }
   res.end();
}
const  Get=(req,res)=> {
   GetQueue(req,res);
   Mymodel.GetAllData(req, res);
   if (res.statusCode == 200) {
      MyQueue.push("fetched all data from Database status:" + httpStatusCode.getStatusText(res.statusCode));
   }
   else {
      MyQueue.push("data couldnot be fetched status:" + httpStatusCode.getStatusText(res.statusCode));
   }
   res.end();
}
const GetOne=(req,res)=>{
   GetOneQueue(req,res);
   Mymodel.GetSingleData(req, res);
   if (res.statusCode == 200) {
      MyQueue.push("fetched data from Database of Employee.id" + req.params.id + "  status:" + httpStatusCode.getStatusText(res.statusCode));
   }
   else {
      MyQueue.push("data couldnot be fetched status:" + httpStatusCode.getStatusText(res.statusCode));
   }
   res.end();

}
const DeleteOne=(req,res)=>{
   DeleteOneQueue(req, res);
   Mymodel.deleteOneData(req, res);
   if (res.statusCode == 200) {
      MyQueue.push("deleted data from Database of Id" + req.params.id + "status:" + httpStatusCode.getStatusText(res.statusCode));
   }
   else {
      MyQueue.push("data couldnot be fetched status:" + httpStatusCode.getStatusText(res.statusCode));
   }
   res.end()
}
const UpdateOne=(req, res)=> {
   UpdateOneQueue(req, res);
   Mymodel.updateOneData(req, res)
   if (res.statusCode == 200) {
      MyQueue.push("updated data from Database of :" + httpStatusCode.getStatusText(res.statusCode));
   }
   else {
      MyQueue.push("data couldnot be fetched status:" + httpStatusCode.getStatusText(res.statusCode));
   }
   res.end();
}
const showLogs=(req, res)=>{
   if(MyQueue.length!=0){
      console.log("showlogs called ");
   res.json(MyQueue);
   }
   else{
   console.log("showlogs called ");
   res.send("no data to show ");
   }
}

module.exports={
   Post:Post,
   GetOne:GetOne,
   Get:Get,
   deleteOneData:DeleteOne,
   UpdateOne:UpdateOne,
   showLogs:showLogs
}