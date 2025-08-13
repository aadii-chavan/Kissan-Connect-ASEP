const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
    scheme_name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    read_more_link: { 
        type: String 
    }
});

const Scheme = mongoose.model("Scheme", SchemeSchema);
module.exports = Scheme; 