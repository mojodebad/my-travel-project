const MongoClient=require("mongodb").MongoClient;
const url= "mongodb://localhost:27107/calender";
const jsonExport=require("jsonexport");
const httpstatus=require("http-status-codes");
const fs=require("fs");
const path=require("path");
const jstoxml=require("jstoxml");
export const save=(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            res.status(501);
            }
            else if(db.db("calender").listCollections(null,{nameOnly:true})!=null){
                db.db("calender").collection("Employee").insertOne(req.body,(error,result)=>{
                    if(error){
                        res.status(500)
                    }
                    else{
                        res.Status(201).json(result.result);
                    }
                });
            }
            else{
                db.db("calender").createCollection("Employee");
                db.db("calender").collection("Employee").insertOne(req.body,(error,result)=>{
                    if(error){
                        res.status(500)
                    }
                    else{
                        res.Status(201).json(result.result);
                    }
                });
            }
            db.close();
    });
    return;
}
export const GetAllData=(req,res)=>{
    MongoClient.connect(url,(error,db)=>{
        if(error){
            res.status(501);
        }
        else{
            db.db("calender").collection("Employee").findOne({},(error,result)=>{
                if(error){
                    res.status(500);
                }
                if(result==null){
                    res.status(204);
                }
                else{
                    if(result.type=="CSV"){
                     jsonExport(result,(erro,csv)=>{
                         if(erro){
                             res.status(httpstatus.METHOD_FAILURE).write(erro);
                         }
                         else{
                            let write=fs.createWriteStream(path.join(__dirname,"data.csv"),{encoding:"utf8"});
                            write.write(csv,(e)=>{
                                res.status(httpstatus.METHOD_FAILURE).write(e);
                            });
                            res.sendFile(path.join(__dirname+"data.csv"));
                         }
                     });
                    }
                    else if(result.type=="XML"){
                        XmlDoc=jstoxml.toXML(JSON.parse(result),{header: true,indent:" "});   
                        res.status(httpstatus.OK).write(XmlDoc);                     
                    }
                }
            });
        }
        db.close();
    });
    return;
    
}
 export const GetSingleData=(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
        res.status(501);
        }
        else{
          db.db("calender").collection("Employee").findOne({id:req.params.id},(error,result)=>{
              if(error){
                  res.status(500);
              }
              else if(result==null){
                  res.status(204);
              }
              else{
                   if(result.type=="csv"){

                     res.Status()  
                   }
              }
          });
        }
        db.close();
    });
    return;
}

export const deleteOneData=(req,res)=>{
  MongoClient.connect(url,(err,db)=>{
      if(err) res.status(501);
      else{
          db.db("calender").collection("Employee").findOneAndDelete({id:req.params.id},(error,result)=>{
              if(error){
                  res.status(500);
              }
              else if(result.value==null){
                  res.status(204);
              }
              else{
                  res.Status(200).json(result);
              }
          })
      }
      db.close();
  });
  return;
}
export const updateOneData=(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            res.status(501);
        }
        else{
            db.db("calender").collection("Employee").findOneAndUpdate(req.body,{$set:{
            
            }},(error,result)=>{
                if(error){
                    res.status(500)
                }
                else{
                    res.Status(200).json(result);
                }          
            });
        }
        db.close();
        
    })
    return;
}