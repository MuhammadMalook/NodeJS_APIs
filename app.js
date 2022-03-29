const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get('/', (req,res)=>{
    // console.log('Got body:', req.body);
    // res.sendStatus(200);
    res.send("hello world");
});

const courses = [
    {id:1, name:"Programming Fundamentals"},
    {id:2, name:"Object Oriented Programming"}
]

app.get('/api/courses' , (req, res)=>{
        res.send(courses)
});

app.post('/api/courses', (req, res)=>{
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
})

app.listen(3000, ()=> console.log("Server is listening to port 3000"))