const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = require("./config/mysql.js");
const app = express();
const conn = db.init();
const path = require('path');

const uploadDirectory = 'uploads/';

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.set("port", process.env.PORT || 3000);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) 
  }
});

const upload = multer({ storage: storage });

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

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.send(imageUrl); 
    console.log(imageUrl);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});


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

app.post('/addReview', (req, res) => {
  const { user_id, destination_id, review_content, review_picture_url, rating, create_date } = req.body;
  const query = 'INSERT INTO reviews (user_id, destination_id, review_content, review_picture_url, rating, create_date) VALUES (?, ?, ?, ?, ?, ?)';

  conn.query(query, [user_id, destination_id, review_content, review_picture_url,rating, create_date], (error, results) => {
    if (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ success: false, message: "Error adding review" });
      return;
    }

    res.status(200).json({ success: true, message: 'Review added successfully' });
  });
});

app.post('/addPlace', async (req, res) => {
  try {
    const { user_id, name, text, select, imageUrl } = req.body;
    conn.query(
      'INSERT INTO travel_destinations (user_id, td_name, td_picture_url, description, category) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, imageUrl, text, select],
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

app.post('/review/post', async (req, res) => {
  try {
    const { user_id, name, text, select, imageUrl } = req.body;
    conn.query(
      'INSERT INTO travel_destinations (user_id, td_name, td_picture_url, description, category) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, imageUrl, text, select],
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

app.get('/travelDestinations', async (req, res) => {
  try {
      const { id } = req.query;
      const query = 'SELECT * FROM travel_destinations WHERE id = ?';
      
      conn.query(query, [id], (error, results, fields) => {
          if (error) {
              console.error('Error fetching travel destination:', error);
              res.status(500).json({ success: false, error: error.message });
              return;
          }

          if (results.length === 0) {
              res.status(404).json({ success: false, message: 'Travel destination not found' });
              return;
          }

          res.status(200).json({ success: true, data: results[0] });
      });
  } catch (error) {
      console.error('Error fetching travel destination:', error);
      res.status(500).json({ success: false, error: error.message });
  }
});




app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
