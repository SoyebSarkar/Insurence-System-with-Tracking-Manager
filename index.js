const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Policy = require('./model/policy');
const Customer = require('./model/customer');
const methodOverride = require('method-override');
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
app.get('/customer', async(req,res)=>{
    const customer = await Customer.findById("6361716bfd2cf24599e872fb");

    res.render('customer-dashboard',{customer});
})



app.post('/customer', async (req,res)=>{
    const {id, password} = req.body;
    // console.log(id);
    // console.log(password);
    try{
        const customer = await Customer.findById(id);
        const policies = await Policy.find();
        console.log(policies);
        
     
        if(customer.password=== password){
            
            // for(let cus of customer){
            //     console.log()
            // }
             let premDue = customer.policy.filter(p => p.due==true) 
             console.log(premDue);
            res.render("customer-dashboard", {customer, policies});
            res.status(200).end();
        }
        else{
            res.send("Wrong Password")
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
    res.send("applied"); 
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
    res.render('customer-dashboard',{customer});
    
})


app.patch('/customer/policy',async (req,res)=>{
    const {id} = req.body;
    let customer = await Customer.findOneAndUpdate({id, "policy.due": true}, {$set: { "policy.$.due" : false }});
    // let customer = await Customer.findOne({id, "policy.due": true});
    // customer.policy[0].due = false;
    // customer.markModified('due');

    console.log(customer)
    await customer.save()
    res.redirect('/customer');
})




app.listen(3000,(res)=>{
    console.log("Server Online")
})