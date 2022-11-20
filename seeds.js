const mongoose = require('mongoose');
const Customer = require('./model/customer');
const Admin = require('./model/admin');

const policy = require('./model/policy');
mongoose
  .connect('mongodb://127.0.0.1:27017/insurenceSystem')
  .then(() => {
    console.log('MongoDB connected!!')
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err)
  })

  // const p1 = Customer({
  //   name:'Soyeb Sarkar',
  //   password: 'iem@24',
  //   mobile:123456789,
  //   question:[
  //       {
  //           qs: 'How can I buy policy ?',
  //           ans:'Sir You can see different policy in policies and you can apply from there'
  //       }
  //   ],
  //   policy:[
  //       {
  //           name: 'SBI Life Insurence',
  //           premium:2000,
  //           due:true
  //       },
  //       {
  //           name: 'HDFC Family Insurence',
  //           premium:3210,
  //           due:true
  //       }
  //   ]
  // });
  // p1.save()
  // .then(p=>{
  //   console.log(p)
  // })
  // .catch(e=>{
  //   console.log(e);
  // })

  // const policies = [
  //   { name: 'SBI Life Insurence', premium: 2000, due: true, approved:false },
  //   { name: 'HDFC Family Insurence', premium: 3210, due: true, approved:false },
  //   { name: 'Axis Home Insurences', premium: 5110, due: true, approved:false },
  //   { name: 'SRM Travel Insurences', premium: 2210, due: true, approved:false }
  // ];
  // policy.insertMany(policies)

  // .then(p=>{
  //   console.log(p)
  // })
  // .catch(e=>{
  //   console.log(e);
  // })
  // const a1 = Admin(
  //   {
  //     name: "Soyeb Sarkar",
  //   password:"Admin@123",
  //   }
  // );
  // a1.save()
  // .then(p=>{
  //   console.log(p)
  // })
  // .catch(e=>{
  //   console.log(e);
  // })