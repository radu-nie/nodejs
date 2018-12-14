"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

MongoClient = require('mongodb').MongoClient;

class MongoService {

    url = "mongodb://localhost:27017/";

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
}
exports.userService = new UserService();