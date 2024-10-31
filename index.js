const express = require('express')
const mongoose = require('mongoose');
const Student = require('./models/student.model.js');
const app = express()

app.use(express.json()); //middleware to send json based POST

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

app.post("/hogwarts/students", async (req,res) => {
    try {
        await Student.create(req.body);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
    console.log(req.body);
    res.send(req.body);
})


