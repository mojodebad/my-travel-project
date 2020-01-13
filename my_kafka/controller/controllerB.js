 const mongodb=require("mongodb");
 const MongoClient=mongodb.MongoClient;
 export const xmlOperations={
   Post(req,res){
    
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
export const JsonOperations={
  Post(req,res){
      MongoClient.connect("mongodb://localhost:27017/MyDb",(err,db)=>{
           if(err){
               res.status(500).send("error in MongoDb");
               res.end();
           }
           db.collection("JsonData",(collection)=>{
                  collection.insert(req.body,(error,result)=>{
                      if(error){
                          res.status(404).send("couldnot insert data in database");
                          res.end();
                      }
                      res.status(200).send(result.insertedCount+"docs inserted sucessfully");    
                  });
           });
           db.close();
        }
);
   },
   Get(req,res){
      MongoClient.connect("mongodb://localhost:27017/MyDb",(err,db)=>{
          if(err){
            res.status(500).send("error in MongoDb");
            res.end();
          }
          db.collection("JsonData",(collection)=>{
              collection.find().toArray((error,result)=>{
                  if(error){
                      res.send(err).status(500);
                  }
                  if(result.length!=0){
                    res.status(200).json(result);
                  }
                  else{
                      res.status(404).send("no data found");
                  }
              });
          });
          db.close();
      })
   },
   GetOne(req,res){
    MongoClient.connect("mongodb://localhost:27017/MyDb",(err,db)=>{
        if(err){
          res.status(500).send("error in MongoDb");
          res.end();
        }
        db.collection("JsonData",(collection)=>{
            collection.find({id:req.params.id}).toArray((error,result)=>{
                if(error){
                    res.send(err).status(500);
                }
                if(result.length!=0){
                  res.status(200).json(result);
                }
                else{
                    res.status(404).send("no data found");
                }
            })
        });
        db.close();
    });
   },
   DeleteOne(req,res){
    MongoClient.connect("mongodb://localhost:27017/MyDb",(err,db)=>{
        if(err){
          res.status(500).send("error in MongoDb");
          res.end();
        }
        db.collection("JsonData",(collection)=>{
            collection.findOneAndDelete({id:req.params.id},(err,todo)=>{
                if(err){
                    res.status(500).send("some internal problem unable to delete data");
                }
                else if(todo.value){
                    res.json(todo.value).status(200);
                }
                else{
                    res.status(404).send("No data to be deleted");
                }
            });
        });
        db.close();
    });
   },
   UpdateOne(req,res){
       MongoClient.connect("mongodb://localhost:27017/MyDb",(err,db)=>{
     
       if(err){
           res.status(500).send("Couldnot connect to database"+err);
           res.end();
       }
       db.collection("JsonData",(error,db)=>{
           if(error){
               res.status(500).send("we cannot update data sorry ");
           }
           else{
               db.updateOne({id:req.body.id},{
                   $set:{
                    // data to be send
                   }
               },(eror,resp)=>{
                  if(eror){
                     res.send(eror).status(501);
                  }
                  res.send(resp).status(500);
            })
           }
       })
       db.close();
       });

   } 
}