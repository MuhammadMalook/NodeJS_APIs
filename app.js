const Joi = require('joi');
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

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
       return res.status(404).send("The course with given id was not found!")
    
    res.send(course)
})

app.post('/api/courses', (req, res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const {error} = ValidadateCourse(req.body)

    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
})

app.put('/api/courses/:id' , (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with given id was not found!")

    const {error} = ValidadateCourse(req.body)

    if(error)
        return res.status(400).send(error.details[0].message)
       
    course.name = req.body.name;
    res.send(course)

})

app.delete('/api/courses/:id', (req, res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The course with given id was not!")

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})


function ValidadateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

const port  = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server is listening to port ${port}...`))