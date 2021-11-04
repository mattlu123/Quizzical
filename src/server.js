const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'mattlu123',
  password: '123456789',
  database: 'trivia'
});
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')));
connection.connect((err) => {
  if(!err){
    console.log("connected");
  }else{
    console.log("connection failed" + JSON.stringify(err, undefined, 2));
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//login request
app.post('/login', function (req, res) {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let status = false;
  
  //check output from mysql
  connection.query("select username, password from users", function(err, rows){
    if(err) throw err;
    for(let i = 0; i < rows.length; i++){
      if(username != rows[i].username || password != rows[i].password){
        status = false;
      }else{
        status = true;
        break;
      }
    }
    if(status){
      res.send({
        "success": true,
        "message": "successful login"
      });
      console.log("worked");
    }else{
      res.send({
        "success": false,
        "message": "Invalid Login"
      });
    }
  });
})

//signup request
app.post('/signup', function (req, res) {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let validInput = true;
  let status = true;

  //check if input is correct
  if(!username || !password || (/^\s*$/).test(username) || (/^\s*$/).test(password) ||
    !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email)){
      validInput = false;
  }

  //log to mysql
  connection.query("select username, password, email from users", function(err, rows){
    if(err) throw err;
    for(let i = 0; i < rows.length; i++){
      console.log
      if(username == rows[i].username || password == rows[i].password || email == rows[i].email){
        status = false;
        break;
      }else{
        status = true;
      }
    }
    console.log(status);
    if(status && validInput){
      connection.query("insert into users (username, password, email) values ('" + 
        username + "', '" + password + "', '" + email + "')", 
      function(err){
        if(err) throw err;
        console.log("successful signup");
      });
      res.send({
        "success": true,
        "message": "successful signup"
      });
    }else{
      res.send({
        "success": false,
        "message": "Invalid Sign Up Info"
      });
    }
  });
})

app.get('/fetchTableData',function (req, res){
  //console.log("hello");
  connection.query("select username, points from users order by points desc", function(err, rows){
    if(err) throw err;
    console.log(rows);
    res.send({
      "rows": rows
    });
  })
});

app.post('/updatePoints', function(req,res){
  let username = req.body.username;
  connection.query("update users set points = (points + 10) where username = '" + username + "'", 
  function(err, rows){
    if(err) throw err;
    console.log("succesful");
  })
});

app.post('/fetchQ', function (req, res){
  console.log("test");
  //fetch questions.json
  fs.readFile('questions.json', (err, data) => {
    if (err) throw err;
    
    let questions = JSON.parse(data).results;
    let category = req.body.category;
    let difficulty = req.body.difficulty;
    
    if(category != "all"){
      questions = questions.filter(function(entry){
        return entry.category.toLowerCase().includes(category);
      });
    }

    if(difficulty != "all"){
      questions = questions.filter(function(entry){
        return entry.difficulty === difficulty;
      });
    }

    let index = Math.floor(Math.random() * (questions.length));
    let question = questions[index];
    
    console.log(question);

    res.json({
      "question": question
    });

    return;
  });
});

app.listen(8080);
