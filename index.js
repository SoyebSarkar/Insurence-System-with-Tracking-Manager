const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./model/customer');
const Customer = require('./model/customer');
const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}))
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
    const customer = await Customer.findById("6356e0ea00f1d4f5c73ca808");
    
    res.render('customer-dashboard',{customer});
})



app.post('/customer', async (req,res)=>{
    const {id, password} = req.body;
    console.log(id);
    // console.log(password);
    try{
        const customer = await Customer.findById(id);
     
        if(customer.password=== password){
            
            // for(let cus of customer){
            //     console.log()
            // }

            res.render("customer-dashboard", {customer});
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






app.listen(3000,(res)=>{
    console.log("Server Online")
})