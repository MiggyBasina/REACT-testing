const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");



const app = express();
app.use(cors());
app.use(express.json()); // Allows Parsing of JSON request bodies

// MYSQL Connection

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'subjects'
});

db.connect(err => {
  if(err) throw err;
  console.log("MySQL connected...")
});


// GET ALL subjects IN THE DATABASE

app.get('/api/subjects', (req, res) =>{
    db.query("SELECT * FROM subjects", (err, results)=> {
      if(err) throw err;
      res.json(results);
    });
});



// PUT: UPDATE AN ITEM

app.put('/api/subjects/:id', (req, res) =>{
    const { id } = req.params;
    const { Subject_Description, Day, Time, Room } = req.body;

    db.query("UPDATE subjects SET Subject_Description = ?, Day = ?, Time = ?, Room = ? WHERE id = ?", [Subject_Description, Day, Time, Room, id], (err) =>{
      if(err) throw err;
      res.json({id, Subject_Description, Day, Time, Room});
    });
});


app.post('/api/subjects', (req, res) =>{
      const {Subject_Description, Day, Time, Room} = req.body;
      db.query("INSERT INTO subjects (Subject_Description, Day, Time, Room) VALUES (?, ?, ?, ?)", [Subject_Description, Day, Time, Room], (err, result) =>{
        if(err) throw err;
        res.json({ id: result.insertId, Subject_Description, Day, Time, Room})
      });
});


// DELETE: remove an Item


app.delete('/api/subjects/:id', (req, res) =>{
  const { id } = req.params;
  db.query("DELETE FROM subjects WHERE id = ?", [id], (err)=>{
    if(err) throw err;
    res.json({message: "Item deleted"});
  });
});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
