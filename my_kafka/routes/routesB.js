const express = require("express");
const router = express.Router();
const controller = require("../controller/controllerB");

router.post("/postdata", (req, res) => {
    controller.Post(req, res);
})
router.put("/updatedata", (req, res) => {
    controller.UpdateOne(req, res);
});
router.get("/deletedata/:id", (req, res) => {
    controller.DeleteOne(req, res);
});
router.get("/gettdata/:id", (req, res) => {
    controller.GetOne(req, res);
});
router.get("/gettdata", (req, res) => {
    controller.Get(req, res);
});
router.get("/showlogs", (req, res) => {
    controller.showLogs(req, res);
});

module.exports={router:router};