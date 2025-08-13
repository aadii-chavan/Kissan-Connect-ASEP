const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true,
        enum: ['General', 'Plot-wise']
    },
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true,
        min: 0 
    },
    description: { 
        type: String 
    },
    date: { 
        type: Date, 
        required: true,
        default: Date.now 
    }
});

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        default: "Default User"
    },
    expenses: [ExpenseSchema]
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
