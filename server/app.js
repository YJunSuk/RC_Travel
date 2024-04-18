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
  console.dir(body);
  const sql = 'SELECT id FROM users WHERE id = ?';
  conn.query(sql, [body.id], (err, results) => {
    if (err) {
      console.log("Error executing query: " + err);
      console.dir(body);
      res.sendStatus(500);
    } else {
      if (results && results.length > 0) {
        console.log("이미 존재하는 ID입니다.");
        //TODO: 예전에 회원가입하고 삭제한 ID가 DB에 있다고 인식됨
        res.sendStatus(401);
      } else {
        const sql2 = 'INSERT INTO users (id, password) VALUES (?, ?)';
        conn.query(sql2, [body.id, body.password], (err) => {
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

app.put('/modify', (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    console.log(id + password);
    res.sendStatus(401);
  }
  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  conn.query(sql, [password, id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.sendStatus(500);
    }

    if (result.affectedRows === 0) {
      console.log("존재하지않는 아이디");
      res.sendStatus(400);
    }
  })
  console.log("업데이트 성공");
  res.sendStatus(200);
});

app.delete('/delete', (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.sendStatus(401);
  }
  const sql = 'DELETE FROM users WHERE id = ?';
  conn.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.sendStatus(500);
    }
    if (result.affectedRows === 0) {
      console.log("존재하지않는 아이디");
      res.sendStatus(400);
    }
  })
  console.log("삭제 성공");
  res.sendStatus(200);
});

app.get('/search', async (req, res) => {
  const { keyword, category } = req.query;

  const sql = `SELECT * FROM travel_destinations WHERE td_name LIKE ? AND category = ?`
  try {
    const [rows, fields] = await conn.promise().query(sql, [`%${keyword}%`, category]);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/destinationCoords', async (req, res) => {
  const { id } = req.query;
  const sql = `SELECT loc_x, loc_y FROM travel_destinations WHERE id = ?`;

  try {
    const [rows, fields] = await conn.promise().query(sql, [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Destination not found' });
    } else {
      const { loc_x, loc_y } = rows[0];
      res.json({ loc_x, loc_y });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/review', async (req, res) => {
  const { id } = req.query;
  const sql = `SELECT * FROM reviews WHERE destination_id = ?`;

  try {
    const [rows, fields] = await conn.promise().query(sql, [id]);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addPlace', async (req, res) => {
  try {
    const { name, text, select, imageUrl } = req.body;
    console.log(imageUrl);
    conn.query(
      'INSERT INTO travel_destinations (td_name, td_picture_url, description, category) VALUES (?, ?, ?, ?)',
      [name, imageUrl, text, select],
      (error, results) => {
        if (error) {
          console.error('Error adding place:', error);
          res.status(500).json({ success: false, error: error.message });
          return;
        }
        
        const lastInsertedId = results.insertId;

        res.status(200).json({ success: true, lastInsertedId: lastInsertedId });
      }
    );
  } catch (error) {
    console.error('Error adding place:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
