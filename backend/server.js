const express = require('express')
const cors = require("cors") //middleware

const app = express();
const db = require("./config/dbconfig")
const port = 8084;

//MIDDLEWARE
app.use(cors());

app.get("/",(req, res) => {
   const sql = 'SELECT * FROM ALUMNO';
   db.query(sql,(err,data) => {
        if (err) return res.json("Error");
        return res.json(data);
   });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


/*app.get('/', (req, res) => {
    res.sendFile(__dirname+"/views/index.html")
});*/


