/***********************************************************************
**********
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic 
Policy. No part * of this assignment has been copied manually or electronically from any 
other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: _____Kunj Patel_________________ Student ID: ___134218205___________ Date: 03-06-2022
________________
*
* Online (Heroku) Link: 
https://rocky-spire-28943.herokuapp.com/about
*
************************************************************************
********/
var express = require("express");
var app = express();
var path = require('path');
var blogservice = require(__dirname + '/blog-service.js');

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart(){
    console.log('Express http server listening on ' + HTTP_PORT);
}

app.use(express.static('public'));

app.get('/', (req, res) =>
{
    res.redirect('/about')
});

app.get('/about', (req, res) => 
{
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/blog", (req, res) => 
{
    blogservice.getPublishedPosts().then((data) =>
    {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/posts", (req, res) => 
{
    blogservice.getAllPosts().then((data) =>
    {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/categories", (req, res) => 
{
    blogservice.getCategories().then((data) =>
    {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get('*', function(req, res){
    res.status(404).send("Page Not Found!");
  });

blogservice.initialize().then(() => 
{
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log("ERROR : From starting the server");
});
