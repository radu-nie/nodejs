"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

const userServiceInstance = require('./user.service');
const express = require("express");
const userRouter = express.Router();

userRouter.post('/authenticate', (req, res, next) => {
    var callBack = function (err, user) {
        if (err) {
            res.json(400, err);
            throw err;
        }
        console.log(user);

        if (user.length && user.length == 1) {
            res.json({
                id: user[0]._id,
                usernafme: user[0].username,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                token: 'fake-jwt-token'
            });
            return;
        }
        return res.json(400, {
            message: 'Username or password is incorrect'
        });
    }
    userServiceInstance.userService.authenticate(req.body, callBack);

});
userRouter.post('/register', (req, res, next) => {
    var callBack = function (err, response) {
        if (err) {
            res.json(400, err);
            throw err;
        }
        console.log(response);

        if (response) {
            res.json();
            return;
        }
        return res.json(400, {
            message: 'Username or password is incorrect'
        });
    }
    userServiceInstance.userService.register(req.body, callBack);

});
userRouter.get('', (req, res, next) => {
    /** Do logic cor authentication JWT as handler for GET Router */
    var callBack = function (err, response) {
        if (err) {
            res.json(400, err);
            throw err;
        }
        console.log(response);

        if (response.length) {
            var userArr = [];
            response.forEach(user => {
                userArr.push({
                    id: user._id,
                    usernafme: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                })
            });
            res.json(userArr);
            return;
        }
        return res.json(400, {
            message: 'No existing users'
        });
    }
    userServiceInstance.userService.getUsers(callBack);
});
userRouter.get('/:id', (req, res, next) => {
    res.json(userServiceInstance.userService.getUserById(req.params.id));
});
userRouter.delete('/:id', (req, res, next) => {
    var callBack = function (err, response) {
        if (err) {
            res.json(400, err);
            throw err;
        }
        console.log(response);
        res.json('User deleted');
    }
    userServiceInstance.userService.deleteUserByID(req.params.id, callBack);
});
// userRouter.post('/register', (req, res, next) => {
//     res.json(userServiceInstance.userService.userName());
// });





exports.userRouter = userRouter;