//File System
const fs =require('fs');

const express = require('express');
const app = express();
const port = process.PORT || 5000;

//express에 body-parser 일부기능이 내장되었다.
app.use(express.json());
//extended 옵션의 경우 true일 경우, 객체 형태로 전달된 데이터 내에서
//또다른 중첩된 객체를 허용하고, false인 경우 허용하지 않는다는 의미
app.use(express.urlencoded({ extended: true }));

//동기처리
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

//db connect 부분 database.json의 형식을 가져온다.
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

//Select 쿼리문을 사용해서 isdeleted컬럼이 0인것을 불러온다.
app.get('/api/customers', (req, res) => {
  connection.query(
    'SELECT * FROM CUSTOMER',
    (err, rows, fields) => {
      res.send(rows);
    }
  )


})

//post insert쿼리문을 사용해서 db에 각 데이터를 보낸다.
app.post('/api/customers', (req, res) => {

  console.log(req.body);

  const sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, now(), 0)';
  
  const name = req.body.NAME;

  const birthday = req.body.birthday;

  const gender = req.body.gender;

  const job = req.body.job;

  const params = [ name, birthday, gender, job ];

  connection.query(sql, params,
     (err, rows, fields) =>{
      console.log("mysql callback");
      console.log(err);
      console.log(rows);
      console.log(fields);
        res.send(rows);
      })
});


//delete
//부분교체 https://papababo.tistory.com/entry/HTTP-METHOD-PUT-vs-PATCH-%EC%B0%A8%EC%9D%B4%EC%A0%90
app.patch('/api/customers/' , (req, res) => {
  const sql = 'DELETE FROM CUSTOMER WHERE id = ?';
  const id = req.body.id;
  const params = [id];
  console.log(params, "delete");
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  )

  

});

//update
//전체교체 https://papababo.tistory.com/entry/HTTP-METHOD-PUT-vs-PATCH-%EC%B0%A8%EC%9D%B4%EC%A0%90
app.put('/api/customers/' , (req, res) => {
  const sql = 'UPDATE CUSTOMER SET NAME = ?, birthday = ?, gender = ?, job = ?, createdDate = now(), isDeleted = 0 WHERE id = ?';
  
  const name = req.body.NAME;

  const birthday = req.body.birthday;

  const gender = req.body.gender;

  const job = req.body.job;

  const id = req.body.id;

  const params = [ name, birthday, gender, job, id ];

  console.log(params);

  connection.query(sql, params,
    (err, rows, fields) => {
      console.log("mysql callback");
      console.log(err);
      console.log(rows);
      console.log(fields);

      res.send(rows);
    }
  )

  

});



app.listen(port, () => console.log(`listening on port ${port}`));