const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.post('/', (req,res)=>{
    // console.log('Got body:', req.body);
    // res.sendStatus(200);
    res.send("req.body")
});

app.listen(3000, ()=> console.log("Server is listening to port 3000"))