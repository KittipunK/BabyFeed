const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors({
  origin: '',
  methods: ['GET', 'POST', 'PUT'],
  credentials: true
}));

app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Z'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.get("/feedData", (req, res)=>{
    
    const Query = 'SELECT * FROM consumptionData ORDER BY id DESC LIMIT 20;';
    

    connection.query(Query, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);

    });
})

app.post("/feedData", (req, res)=>{
    const data = req.body;

    const insertQuery = 'INSERT INTO consumptionData (type, quantity, datetime) VALUES (?, ?, ?)';

    connection.query(insertQuery, [data.Consumption, data.Quantity, data.DateTime], (err, result) => {
        if (err) throw err;
        console.log('Inserted successfully!');
    });
})

app.put("/feedData", (req, res)=>{
  const data = req.body;
  console.log(data);
  const insertQuery = 'DELETE FROM consumptiondata WHERE (id = ?)';

  connection.query(insertQuery, [data.id], (err, result) => {
      if (err) throw err;
      console.log('Deleted successfully!');
      
      const Query2 = 'SELECT * FROM consumptionData ORDER BY id DESC LIMIT 20;';
    

      connection.query(Query2, (err2, result2) => {
          if (err2) throw err2;
          res.status(200).send(result2);

      });

  });
})



app.listen(5000, () =>{console.log("Server started on port 5000")})