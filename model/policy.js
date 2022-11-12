const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    premium:{
        type: Number,
        require: true
    },
    due: {
         type: Boolean,
         default: true
    },
    approved:{
        type: Boolean,
        default:false
    }
})

const policy = mongoose.model('policy',policySchema);

module.exports = policy;