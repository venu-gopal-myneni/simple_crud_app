const express = require('express')
const mongoose = require('mongoose');
const Student = require('./models/student.model.js');
const app = express()

app.use(express.json()); //middleware to send json based POST
app.use(express.urlencoded({extended:false})); //middleware to send form based POST

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => 
    {
        console.log('Connected to DataBase');
        app.listen(3000, () => { console.log("Server listening on port 3000"); });

    }
);



app.get("/", (req, res) => {
    res.send("Hello Wizard from Hogwarts !!");
})


// get all students
app.get("/hogwarts/students", async (req,res) => {
    try {
        const student = await Student.find({});
        res.status(200).json(student)

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// get 1 student by id 
app.get("/hogwarts/students/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const student = await Student.findById(id);
        res.status(200).json(student)

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// add 1 student
app.post("/hogwarts/students", async (req,res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json(student)

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// update 1 student by id
app.put("/hogwarts/students/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body);

        if (!student) {
            return res.status(404).json({message:"Product Not Found"})
        }
        const updatedStudent = await Student.findById(id);
        res.status(200).json(updatedStudent)

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// Delete 1 student by id
app.delete("/hogwarts/students/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({message:"Product Not Found"})
        }
        res.status(200).json({message:"Product Deleted"})
        res.status(200).json(student)


    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

