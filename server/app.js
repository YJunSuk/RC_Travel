const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = require("./config/mysql.js");

const app = express();
const conn = db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.set("port", process.env.PORT || 3000);

app.get('/', (req, res) => {
  return res.send('Hello');
})
 
app.post('/signup', (req, res) => {
  const body = req.body;

  const sql = 'SELECT id FROM users WHERE id = ?';
  conn.query(sql, [body.id], (err, results) => {
    if (err) {
      console.log("Error executing query: " + err);
      res.sendStatus(500); 
    } else {
      if (results.length > 0) {
        console.log("이미 존재하는 ID입니다.");
        res.sendStatus(400);
      } else {
        const sqlInsert = 'INSERT INTO users (id, password) VALUES (?, ?)';
        conn.query(sqlInsert, [body.id, body.password], (err) => {
          if (err) {
            console.log("Error executing query: " + err);
            res.sendStatus(500); 
          } else {
            res.sendStatus(200); 
          }
        });
      }
    }
  });
});

app.post('/login', (req, res) => {
  const body = req.body;

  const sql = 'SELECT * FROM users WHERE id = ? AND password = ?';
  conn.query(sql, [body.id, body.password], (err, results) => {
    if (err) {
      console.log("Error executing query: " + err);
      res.sendStatus(500); 
    } else {
      if (results.length === 0) {
        res.sendStatus(401);
      } else {
        res.sendStatus(200); 
      }
    }
  });
});

app.get('/logout', (req, res) => {
  res.redirect('/');
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
