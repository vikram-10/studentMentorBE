var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongodb=require('mongodb');
const mongoClient = mongodb.MongoClient;
var url="mongodb://localhost:27017"

app.use(bodyParser.json());

app.get("/",function(req,res){
    res.send("Hello World!");
})

app.post("/createStudent",async function(req,res){
  let client=await mongoClient.connect(url);
  let db=client.db("studentmentor");
  await db.collection("student").insertOne({name : req.body.name});
  client.close();
  res.json({
      message: "Student Created!"
  })
});

app.post("/createMentor",async function(req,res){
    let client=await mongoClient.connect(url);
    let db=client.db("studentmentor");
    await db.collection("mentor").insertOne({name : req.body.name});
    client.close();
    res.json({
        message: "Mentor Created!"
    })
});


app.put("/assignStudent/:id",async function(req,res){                      //Assigning student with specific object ID to mentor
    console.log(mongodb.ObjectId(`${req.params.id}`));
});


app.listen(3000,function(req,res){
   console.log("Server Has started");
});