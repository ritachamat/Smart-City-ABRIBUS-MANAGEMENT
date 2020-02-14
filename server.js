var express = require ("express");
var app = express();

// Get Data function to fetch it from MongoDB
async function GetData (Collection){
   try{
       const collection = await database.collection(Collection);
       const item = await collection.find().toArray();
       return item;
   }catch(err){
       return err;
   }
}

// Client connection to MongoDbd
// Main Route
app.get('/', function(req, res){
   res.send("Hello from root - hii");
});

// Testing Route
app.get('/test', function(req, res){
   try{
      GetData("test").then((data) => {
          res.send(data);
      })
  }catch(err){
      res.send(err)
  }
});

// Get all items from Test
app.get("/getAbribus", function(req, res){
   try{
       GetData("Abribus Identification").then((data) => {
           res.send(data);
       })
   }catch(err){
       res.send(err)
   }
});

// Get all the rows in Energy_Consumption Collection
app.get("/getBus", function(req, res){
   try{
       GetData("Bus Identification").then((data) => {
           res.send(data);
       })
   }catch(err){
       res.send(err)
   }
});

// Get all items from Test
app.get("/getBusDrivers", function(req, res){
   try{
       GetData("Bus Drivers' Performance").then((data) => {
           res.send(data);
       })
   }catch(err){
       res.send(err)
   }
});

const PORT = process.env.PORT || 3000;

var database;
var MGresponse;

// Listening port 
 var server = app.listen(PORT, async () => {
    console.log("Listening on port: ", PORT);
    MongoClient = require('mongodb').MongoClient;
    DBConnectionString = 'mongodb+srv://admin:<admin>@cluster0-pw7m4.mongodb.net/test?retryWrites=true&w=majority';
    console.log("List");
    try{
     console.log("List");
      MGresponse = await MongoClient.connect(DBConnectionString, 
          {
          useNewUrlParser: true, 
          useUnifiedTopology: true 
      });
      console.log("List");
      database = await MGresponse.db("Abribus_Management");
      console.log("List");
      if(database){
          console.log("Database connected");
      }
      else{
          console.log("Connection error to database");
      }
  }catch(err){
      return err;
  }
});
