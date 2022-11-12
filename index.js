const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Policy = require('./model/policy');
const Customer = require('./model/customer');
const methodOverride = require('method-override');
const alert = require('alert'); 
const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs')


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
    const customer = await Customer.find();
    const policies = await Policy.find();
    res.render('admin-dashboard',{customer, policies});
})



app.post('/customer', async (req,res)=>{
    const {id, password} = req.body;

    try{
        const customer = await Customer.findById(id);
        const policies = await Policy.find();
        console.log(policies);
        
     
        if(customer.password === password){

             let premDue = customer.policy.filter(p => p.due==true) 
             console.log(premDue);
             res.redirect(`/customer/${id}`);
        }
        else{
            alert("Wrong Password")
            res.redirect("/sign-in")
        }
    }
    catch{
        res.send("Wrong ID")
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

    customer = await Customer.findById(id);
    await customer.save()
    res.redirect(`/customer/${id}`);
})




app.listen(3000,(res)=>{
    console.log("Server Online")
})