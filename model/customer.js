const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    mobile:{
        type:Number
    },
    question:{
        type:[Object]
    },
    policy:{
        type:[Object]
    },
    approved:{
        type:Boolean
    }
})

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;