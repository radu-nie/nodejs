"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

const express = require("express");
const fileRouter = express.Router();
const fs = require('fs');

/** Get all documents in storage folder */
fileRouter.get('/getDocuments', (req, res, next) => {
    var data = {};
    readFiles('storage/', function (filename, content) {
        data[filename] = content;

        console.log('All documents read!');
        res.json(data);
    }, function (err) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        return res.end("404 Not Found" + err);
    });
})
/** Reads filename sent as query string ?filename= */
fileRouter.get('/read', (req, res, next) => {
    fs.readFile(('storage/' + req.query.filename + '.html' || 'demofile.html'), function (err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return res.end("404 Not Found");
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        return res.end();
    });
});

/** Writes file with static content and query string ?filename= */
fileRouter.get('/write', (req, res, next) => {
    fs.appendFile(('storage/' + req.query.filename + '.html' || 'newFile.html'), `<html><head></head><body><img src="https://www.forbes.ro/wp-content/uploads/2017/05/Softelligence_Engineering_11-525x350.jpg"></body></html>`, function (err) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return res.end("404 Not Found");
        }
        console.log('Saved!');
        res.json({
            statusMessage: 'File ' + req.query.filename + ' Saved'
        });
    });
});

/** Deletes file using querystring ?=filename */
fileRouter.get('/delete', (req, res, next) => {
    fs.unlink(('storage/' + req.query.filename + '.html'), function (err) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return res.end("404 Not Found");
        }
        console.log('File deleted!');
        res.json({
            statusMessage: 'File ' + req.query.filename + ' Deleted'
        })
    });
})

/** function helper for reading all files in directory */
function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}

exports.fileRouter = fileRouter;