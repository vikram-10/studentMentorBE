var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongodb=require('mongodb');
const mongoClient = mongodb.MongoClient;
var url="mongodb://localhost:27017"

app.use(bodyParser.json());

app.get("/",function(req,res){
    res.send("Hello World!");
});

app.get("/showStudents",async function(req,res){                              //Shows all Student API
   let client=await mongoClient.connect(url);
   let db=client.db("studentmentor");
   let allStudents=await db.collection('student').find().toArray();
   client.close();
   res.json(allStudents);
});

app.post("/createStudent",async function(req,res){                           //Creates Student API
  let client=await mongoClient.connect(url);
  let db=client.db("studentmentor");
  await db.collection("student").insertOne({name : req.body.name});
  client.close();
  res.json({
      message: "Student Created!"
  })
});

app.get("/showMentors",async function(req,res){                            //Sends all mentors API
    let client=await mongoClient.connect(url);
    let db=client.db("studentmentor");
    let allMentors=await db.collection('mentor').find().toArray();
    client.close();
    res.json(allMentors);
});

app.post("/createMentor",async function(req,res){                          //Creation of Mentor API
    let client=await mongoClient.connect(url);
    let db=client.db("studentmentor");
    await db.collection("mentor").insertOne({name : req.body.name});
    client.close();
    res.json({
        message: "Mentor Created!"
    })
});


app.put("/assignStudent/:name",async function(req,res){                      //Assigning student with specific object ID to mentor
   let client=await mongoClient.connect(url);
   let db=client.db("studentmentor");
   let studentName=req.params.name;
   let studentDetails=await db.collection('student').find({name:studentName});   //How to find using object ID? mongodb.ObjectId() not working properly.
   client.close();
   console.log(studentDetails.name);                          //how to pick specific keys from the returned object from find? How to assign stiudent to mentor?
});


app.listen(3000,function(req,res){
   console.log("Server Has started");
});