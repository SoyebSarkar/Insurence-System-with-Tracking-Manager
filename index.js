const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Policy = require('./model/policy');
const Customer = require('./model/customer');
const Admin = require('./model/admin');
const methodOverride = require('method-override');
const alert = require('alert'); 
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')


const policy = require('./model/policy');
const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs')


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'testcodefor@gmail.com',
      pass: 'ltunmoeiusbhbbzo'
    }
  });

transporter.verify().then(console.log).catch(console.error);


mongoose
  .connect('mongodb://127.0.0.1:27017/insurenceSystem')
  .then(() => {
    console.log('MongoDB connected!!')
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err)
  })

  



app.get('/',(req,res)=>{
  
    res.render('home');
    
})
app.get('/sign-up',(req,res)=>{
    res.render('sign-up');
})
app.get('/sign-in',(req,res)=>{
    res.render('sign-in');
})
app.get('/customer/:id', async(req,res)=>{
    const {id} = req.params;
    const customer = await Customer.findById(id);
    const policies = await Policy.find();
    console.log(customer.policy.some(pol=>(pol.name===policies[0].name)));
    // console.log(policies[0]);
    res.render('customer-dashboard',{customer, policies});
})

app.get('/admin/:id', async(req,res)=>{
    const {id} = req.params;
    const admin = await Admin.findById(id);
    
    const policies = await Policy.find();
    const customers = await Customer.find();
    console.log(customers.length);
    res.render('admin-dashboard',{admin,customers, policies});
})

app.post('/create/account', async(req,res)=>{
    const {fullName, email,password} = req.body;
    console.log(fullName + email + password);
    const p1 = Customer({
        name:fullName,
        password: password,
        mobile:123456789,
        question:[],
        policy:[],
        approved:false
      }); 
      p1.save()
      .then(p=>{
        console.log(p)
        let mailOptions = {
            from: 'testcodefor@gmail.com',
            to: email,
            subject: 'Welcome To Insurence System',
            text: `Your Account Created, Your Customer Id is ${p._id}`, 
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
      })
      .catch(e=>{
        console.log(e);
      })
      const data = "Thank You for Chosing Us"
    res.render('error',{data});

})
 

app.post('/customer', async (req,res)=>{
    const {id, password} = req.body;

    try{
        const customer = await Customer.findById(id);
        const policies = await Policy.find();
        console.log(policies);
        
     
        if(customer.password === password){
            if(customer.approved){
                let premDue = customer.policy.filter(p => p.due==true) 
                console.log(premDue);
                res.redirect(`/customer/${id}`);
           }
           else{
            const data = "Wait Until,  Admin Approves Your Application";
            res.render('error',{data})
           }
            }
             
        else{
          const data = "Wrong Password, Plese Enter A valid Password";
          res.render('error',{data})
        }
    }
    catch{
      const data = "Wrong ID, Plese Enter A valid ID";
      res.render('error',{data})
    }
      
})

app.post('/apply/:cusId/:polId', async(req,res)=>{
    const {polId,cusId} = req.params;
    const customer = await Customer.findById(cusId);
    const policy = await Policy.findById(polId);
    customer.policy.push(policy);
    await customer.save();
    console.log(customer);
    const policies = await Policy.find();
    res.redirect(`/customer/${cusId}`);
})

app.post('/create-question',async (req,res)=>{
    const {qs, id} = req.body;

    const question = {
        qs:qs,
        ans:''
    }
    const customer = await Customer.findById(id);
    customer.question.push(question);
    await customer.save()
    res.redirect(`/customer/${id}`);
    
})


app.patch('/customer/policy',async (req,res)=>{
    const {id} = req.body;
    let customer = await Customer.findOneAndUpdate({id, "policy.due": true}, {$set: { "policy.$.due" : false }});

    await customer.save()
    res.redirect(`/customer/${id}`);
})
app.patch('/admin/:adminId/:cusId',async (req,res)=>{
    const {adminId, cusId} = req.params;
    let customer = await Customer.findById(cusId);
    customer.approved = true;
    await customer.save();
    console.log(customer);
    
 
    res.redirect(`/admin/${adminId}`);
})
app.patch('/admin/:adminId/:cusId/:polId',async (req,res)=>{
    const {adminId, cusId,polId} = req.params;
    console.log(`Pol Id is ${polId}`);
    const policy = await Policy.findById(polId);
    let customer = await Customer.findOneAndUpdate({"_id":cusId, "policy._id": policy._id}, {$set: { "policy.$.approved" : true }});
    console.log(customer);


 
    res.redirect(`/admin/${adminId}`);
})








app.listen(3000,(res)=>{
    console.log("Server Online")
})