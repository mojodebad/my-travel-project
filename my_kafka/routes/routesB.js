const express=require("express");
const router=express.Router();
const controller=require("../controller/controllerA");
router.post("postdata",controller.postData(req,res));
router.put("updatedata",controller.updateData(req,res));
router.get("deletedata/:id",controller.deleteData(req,res));
router.get("gettdata/:id",controller.getOne(req,res));
router.get("gettdata",controller.getData(req,res));