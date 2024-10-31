const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A wizard or with must have a name"]
    },
    wand: {
        type: String,
        required: [true]
    },
    pet: {
        type: String
    },
    age: {
        type: Number,
        required: [true]
    },
},
{
    timestamps: true
}

);

const Student = mongoose.model("Mage", StudentSchema);

module.exports = Student;