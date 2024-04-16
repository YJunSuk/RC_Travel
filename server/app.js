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

app.get('/', (req, res)=>{
  return res.send('Hello');
})

app.post('/signup', (req,res) => {
  const body = req.body;
 var sql = `INSERT INTO users (id, password) VALUES ('${body.id}', '${body.password}')`;
  conn.query(sql, (err)=>{
    if (err) console.log("query is not excuted: " + err);
    else res.sendStatus(200);
  })
});

app.get('/login', (req, res)=> {
  
});


app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
})
