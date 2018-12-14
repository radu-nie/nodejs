// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("nodeAPI");
  var query = {
    name: "Company Inc"
  };
  dbo.collection("users").find(query).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});