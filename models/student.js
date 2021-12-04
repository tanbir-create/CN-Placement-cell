
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        requried: true,
        maxlength: 255
    },

    college: {
        type: String,
        required: true,
    },

    batch: {
        month: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },

    courseScores: {
        dsa: Number,
        webD: Number,
        react: Number
    },

    isPlaced: {
        type: Boolean,
        default: false
    },

    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }
    ]
    
}, {
    timestamps: true
})

const Student = new mongoose.model('Student', studentSchema);
module.exports = Student;