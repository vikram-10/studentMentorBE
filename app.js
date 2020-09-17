var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongodb=require('mongodb');
var cors=require('cors');
const mongoClient = mongodb.MongoClient;
var url="mongodb://localhost:27017"

app.use(cors({
    origin: "http://127.0.0.1:5500/index.html"
}))


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
  await db.collection("student").insertOne({name : req.body.name,status:req.body.status});
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


app.put("/assignStudent/:id/:studentName",async function(req,res){                      //Assigning student with specific object ID to mentor
   let client=await mongoClient.connect(url);
   let db=client.db("studentmentor");
   let mentorId=req.params.id;
   let mentorDetails=await db.collection('mentor').findOneAndUpdate({_id:mongodb.ObjectID(mentorId)},{$addToSet: {studentName: req.params.studentName}});
   let studentDetails=await db.collection('student').findOneAndUpdate({name:req.params.studentName},{$set:{status:"assigned"}});
   client.close();    
   res.json(studentDetails);                   
});


app.listen(3000,function(req,res){
   console.log("Server Has started");
});