const fs =require('fs');
const express = require('express');
const app = express();
const port = process.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();


app.get('/api/customers', (req, res) => {
    connection.query(
      'SELECT * FROM CUSTOMER',
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.post('/api/customers', (req, res) => {

  console.log(req.body);

  const sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?)';
  
  const name = req.body.NAME;

  const birthday = req.body.birthday;

  const gender = req.body.gender;

  const job = req.body.job;

  const params = [ name, birthday, gender, job ];

  connection.query(sql, params,
     (err, rows, fields) =>{
        res.send(rows);
      })
});

app.listen(port, () => console.log(`listening on port ${port}`));