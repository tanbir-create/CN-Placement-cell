const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
        maxlength: 255
    },

    date: {
        type: Date,
        required: true
    },

    candidates: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        
        status: {
            type: String,
            enum: ['P', 'F', 'OH', 'DA' ],
            defeult: 'DA'
        }
    }
    ]

}, {
    timestamps: true
})



const Interview = new mongoose.model('Interview', interviewSchema);
module.exports = Interview;