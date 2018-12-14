"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const mongodb = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
var config = require('config');

const users = [{
        firstName: "florin",
        lastName: "popescu",
        username: "florin",
        password: "popescu",
        id: 1
    },
    {
        firstName: "Radu Alexandru",
        lastName: "Nie",
        username: "nie.radu",
        password: "nieradu",
        id: 2
    }
];

class UserService {
    setUsers() {
        return users;
    }
    userName(param) {
        return 'Go to another WEB API layer';
    }
    getUserById(id) {
        var users = this.setUsers();
        return users.filter(x => x.id == id);
    }
    deleteUserByID(id, cba) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");
            var query = {
                _id: new mongodb.ObjectID(id)
            };
            dbo.collection("users").deleteOne(query, function (err, user) {
                cba(err, user);
                db.close();
            });
        });

    }
    authenticate(userInfo, cba) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");
            var query = {
                username: userInfo.username,
                password: userInfo.password
            };
            dbo.collection("users").find(query).toArray(function (err, user) {
                cba(err, user);
                db.close();
            });
        });
    }
    register(userInfo, cba) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");
            var query = {
                username: userInfo.username,
                password: userInfo.password,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName
            };
            dbo.collection("users").insertOne(query, function (err, res) {
                cba(err, res);
                db.close();
            });
        });
    }
    getUsers(cba) {
        var url = config.get('dbConfig.url');

        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("nodeAPI");
            var query = {};
            dbo.collection("users").find(query).toArray(function (err, user) {
                cba(err, user);
                db.close();
            });
        });
    }
}

exports.userService = new UserService();