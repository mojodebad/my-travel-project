const MongoClient=require("mongodb").MongoClient;
const url= "mongodb://localhost:27107/calender";
const save=(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            res.sendStatus(501);
            }
            else if(db.db("calender").listCollections(null,{nameOnly:true})!=null){
                db.db("calender").collection("Employee").insertOne(req.body,(error,result)=>{
                    if(error){
                        res.sendStatus(500)
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
                        res.sendStatus(500)
                    }
                    else{
                        res.Status(201).json(result.result);
                    }
                });
            }
            db.close();
    });
}
const GetAllData=(req,res)=>{
    MongoClient.connect(url,(error,db)=>{
        if(error){
            res.sendStatus(501);
        }
        else{
            db.db("calender").collection("Employee").findOne({},(error,result)=>{
                if(error){
                    res.sendStatus(500);
                }
                if(result==null){
                    res.sendStatus(204);
                }
                else{
                    res.Status(200).json(result);
                }
            });
        }
        db.close();
    });
    return;
    
}
const GetSingleData=(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
        res.sendStatus(501);
        }
        else{
          db.db("calender").collection("Employee").findOne({id:req.params.id},(error,result)=>{
              if(error){
                  res.sendStatus(500);
              }
              else if(result==null){
                  res.sendStatus(204);
              }
              else{
                  res.Status(200).json(result);
              }
          });
        }
        db.close();
    });
    return;
}

const deleteOneData=(req,res)=>{
  MongoClient.connect(url,(err,db)=>{
      if(err) res.sendStatus(501);
      else{
          db.db("calender").collection("Employee").findOneAndDelete({id:req.params.id},(error,result)=>{
              if(error){
                  res.sendStatus(500);
              }
              else if(result.value==null){
                  res.sendStatus(204)
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
const updateOneData=(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err){
            res.sendStatus(501);
        }
        else{
            db.db("calender").collection("Employee").findOneAndUpdate(req.body,{$set:{
            
            }},(error,result)=>{
                if(error){
                    res.sendStatus(500)
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