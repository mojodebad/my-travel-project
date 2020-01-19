const express=require("express");
const router=express.Router();
const controller=require("../controller/controllerB").JsonOperations;
router.post("postdata",controller.Post(req,res));
router.put("updatedata",controller.UpdateOne(req,res));
router.get("deletedata/:id",controller.DeleteOne(req,res));
router.get("gettdata/:id",controller.GetOne(req,res));
router.get("gettdata",controller.Get(req,res));
router.get("showlogs",controller.showLogs(req,res));
router.get("",(req,res)=>{
    res.se
})
module.exports=router;