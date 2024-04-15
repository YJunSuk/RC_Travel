const express = require('express');
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'rc_traveldb'
});

var select_user = 'select * from users'
var select_td = 'select * from travel_destinations'
var select_review = 'select * from reviews'

connection.connect();

connection.query(select_review, function (err, rows, fields) {
    // sql 문에 해당하는 행을 rows가 받음 -> 테이블 전체 행
    try {
        for (var i = 0; i < rows.length; i++) {
            // console.log(rows[i].id, rows[i].password); // users테이블
            console.log(rows[i].id, rows[i].user_id, rows[i].td_name, "경도" + rows[i].loc_x, "위도" + rows[i].loc_y, rows[i].description, rows[i].category);  // td 테이블
            //console.log(rows[i].id, rows[i].user_id, rows[i].rating, rows[i].review_content, rows[i].create_date);
        }
    }

    catch (err) {
        console.log(err);
    }
});

var sql = 'insert into travel_destinations (id, user_id, td_name, loc_x, loc_y, description, category) values (null, null, "대구", 14315882.7722772,  4282939.2340513, "대구는 대구지~", "EXTREME");'
connection.query(sql, function (err, rows, fields) {
    // sql 구문에 해당하는 행을 rows가 받음 -> insert 하는 행
    console.log(rows.id, rows.user_id, rows.td_name, rows.loc_x, rows.loc_y, rows.description, rows.category); 
})

var sql2 = 'update song set name="I can\'t stop me", year=2020 where name="more and more"';
conn.query(sql2, function(err,rows,fields){
  console.log(rows.name); // 대상으로 하는 행 없으므로 의미 x
})

var sql3 = 'delete from song  where name="I can\'t stop me"';
conn.query(sql3, function(err,rows,fields){
  console.log(rows.name); // 대상으로 하는 행 없으므로 의미 x
})
var sql4 = 'delete from song  where name=?';
var params = ["I can't stop me"];
conn.query(sql4, params, function(err,rows,fields){
  console.log(rows.name); // 대상으로 하는 행 없으므로 의미 x
})

connection.end();