const mongoose = require('mongoose');
const Customer = require('./model/customer')
mongoose
  .connect('mongodb://127.0.0.1:27017/insurenceSystem')
  .then(() => {
    console.log('MongoDB connected!!')
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err)
  })

  const p1 = Customer({
    name:'Soyeb Sarkar',
    password: 'iem@24',
    mobile:123456789,
    question:[
        {
            qs: 'How can I buy policy ?',
            ans:'Sir You can see different policy in policies and you can apply from there'
        }
    ],
    policy:[
        {
            name: 'SBI Life Insurence',
            premium:2000,
            due:true
        },
        {
            name: 'HDFC Family Insurence',
            premium:3210,
            due:true
        }
    ]
  });
  p1.save()
  .then(p=>{
    console.log(p)
  })
  .catch(e=>{
    console.log(e);
  })