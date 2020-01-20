const MongoClient1 = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/Calender";
const jsonExport = require("jsonexport");
const httpstatus = require("http-status-codes");
const fs = require("fs");
const path = require("path");
const jstoxml = require("jstoxml");
const MongoClients = new MongoClient1(url, { useUnifiedTopology: true, useNewUrlParser: true });

const save = (req, res) => {
    console.log("save called");
    MongoClients.connect().then(db => {
        db.db("Calender").collection("Employee").insertOne(req.body, (error, result) => {
            if (error) {
                res.status(500);
                console.log("error 7899")
            }
            else {
                res.status(201).json(result.result);
                console.log("error415151 ")
            }
        });
    }, err => {
        res.status(httpstatus.METHOD_FAILURE).write(err);
    });
    MongoClients.close(true);
}
// const save = (req, res) => {
//     console.log("save called");
//     MongoClients.connect(url, { useUnifiedTopology: true}, (err, db) => {
//         if (err) {
//             res.status(501);
//             console.log("error ")
//         }
//         else if (db.db("Calender").listCollections(null, { nameOnly: true }) != null) {
//             db.db("Calender").collection("Employee").insertOne(req.body, (error, result) => {
//                 if (error) {
//                     res.status(500);

//                     console.log("error 1213",error)
//                 }
//                 else {
//                     res.Status(201).json(result.result);
//                     console.log("error 23455")
//                 }
//             });
//         }
//         else {
//             db.db("Calender").createCollection("Employee",{capped:false});
//             db.db("Calender").collection("Employee").insertOne(req.body, (error, result) => {
//                 if (error) {
//                     res.status(500);
//                     console.log("error 7899")
//                 }
//                 else {
//                     res.Status(201).json(result.result);
//                     console.log("error415151 ")
//                 }
//             });
//         }
//       //db.close(true);
//     });
//     return;
// }
const GetAllData = (req, res) => {
    console.log("get All data called");
    MongoClients.connect().then(db => {
        db.db("Calender").collection("Employee").findOne({}, (error, result) => {
            if (error) {
                res.status(httpstatus.INTERNAL_SERVER_ERROR).write(error);
            }
            else if (result == null) {
                res.status(httpstatus.NO_CONTENT).write("No Content");
            }
            else {
                if (result.type == "CSV") {
                    jsonExport(result, (erro, csv) => {
                        if (erro) {
                            res.status(httpstatus.METHOD_FAILURE).write(erro);
                        }
                        else {
                            let write = fs.createWriteStream(path.join(__dirname, "data.csv"), { encoding: "utf8" });
                            write.write(csv, (e) => {
                                res.status(httpstatus.METHOD_FAILURE).write(e);
                            });
                            res.sendFile(path.join(__dirname + "data.csv"));
                        }
                    });
                }
                else if (result.type == "XML") {
                    XmlDoc = jstoxml.toXML(JSON.parse(result), { header: true, indent: " " });
                    res.status(httpstatus.OK).write(XmlDoc);
                }
            }
        });
    },
        err => {
            res.status(httpstatus.SERVICE_UNAVAILABLE).write(err);
        });
}

// const GetAllData = (req, res) => {
//     console.log("Get All data called");
//     MongoClients.connect(url, { useUnifiedTopology: true, keepAlive: false }, (error, db) => {
//         if (error) {
//             res.status(501);
//         }
//         else {
//             db.db("Calender").collection("Employee").findOne({}, (error, result) => {
//                 if (error) {
//                     res.status(500);
//                 }
//                 if (result == null) {
//                     res.status(204);
//                 }
//                 else {
//                     if (result.type == "CSV") {
//                         jsonExport(result, (erro, csv) => {
//                             if (erro) {
//                                 res.status(httpstatus.METHOD_FAILURE).write(erro);
//                             }
//                             else {
//                                 let write = fs.createWriteStream(path.join(__dirname, "data.csv"), { encoding: "utf8" });
//                                 write.write(csv, (e) => {
//                                     res.status(httpstatus.METHOD_FAILURE).write(e);
//                                 });
//                                 res.sendFile(path.join(__dirname + "data.csv"));
//                             }
//                         });
//                     }
//                     else if (result.type == "XML") {
//                         XmlDoc = jstoxml.toXML(JSON.parse(result), { header: true, indent: " " });
//                         res.status(httpstatus.OK).write(XmlDoc);
//                     }
//                 }
//             });
//         }
//       db.close(true);
//     });
//     return;

// }

const GetSingleData = (req, res) => {
    console.log("get single data called");
    MongoClients.connect().then(db => {
        db.db("Calender").collection("Employee").findOne({ id: req.params.id }, (error, result) => {
            if (error) {
                res.status(httpstatus.NOT_FOUND).write(error);
            }
            else if (result == null) {
                res.status(httpstatus.NOT_FOUND).write("no content");
            }
            else {
                if (result.type == "CSV") {
                    jsonExport(result, (erro, csv) => {
                        if (erro) {
                            res.status(httpstatus.METHOD_FAILURE).write(erro);
                        }
                        else {
                            let write = fs.createWriteStream(path.join(__dirname, "data.csv"), { encoding: "utf8" });
                            write.write(csv, (e) => {
                                res.status(httpstatus.METHOD_FAILURE).write(e);
                            });
                            res.sendFile(path.join(__dirname + "data.csv"));
                        }
                    });
                }
                else if (result.type == "XML") {
                    XmlDoc = jstoxml.toXML(JSON.parse(result), { header: true, indent: " " });
                    res.status(httpstatus.OK).write(XmlDoc);
                }
            }
        })
    }, err => { 
        res.status(httpstatus.INTERNAL_SERVER_ERROR).write(err);
    });
}

// const GetSingleData = (req, res) => {
//     console.log("get single data called");
//     MongoClients.connect(url, { useUnifiedTopology: true, keepAlive: false }, (err, db) => {
//         if (err) {
//             res.status(501);
//         }
//         else {
//             db.db("Calender").collection("Employee").findOne({ id: req.params.id }, (error, result) => {
//                 if (error) {
//                     res.status(500);
//                 }
//                 else if (result == null) {
//                     res.status(204);
//                 }
//                 else {
//                     if (result.type == "csv") {

//                         res.Status()
//                     }
//                 }
//             });
//         }
//       db.close(true);
//     });
//     return;
// }
const deleteOneData = (req, res) => {
    console.log("delete One data called");
    MongoClients.connect((err, db) => {
        if (err) res.status(501);
        else {
            db.db("Calender").collection("Employee").findOneAndDelete({ id: req.params.id }, (error, result) => {
                if (error) {
                    res.status(500);
                }
                else if (result.value == null) {
                    res.status(204);
                }
                else {
                    res.Status(200).json(result);
                }
            })
        }
        db.close(true);
    });
    return;
}
const updateOneData = (req, res) => {
    console.log("update one data called");
    MongoClients.connect( (err, db) => {
        if (err) {
            res.status(501);
        }
        else {
            db.db("Calender").collection("Employee").findOneAndUpdate(req.body, {
                $set: {

                }
            }, (error, result) => {
                if (error) {
                    res.status(500)
                }
                else {
                    res.Status(200).json(result);
                }
            });
        }
        db.close(true);
    })
    return;
}
module.exports = {
    save: save,
    updateOneData: updateOneData,
    deleteOneData: deleteOneData,
    GetAllData: GetAllData,
    GetSingleData: GetSingleData
}