const express = require("express");
const path = require("path");
const exp = require("constants");
const app= express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
  const contact = mongoose.model('Contact', contactSchema);

const port =8000;
//EXPRESS SPECIFIY STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIY STUFF
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

//ENDPOINTS
app.get('/',(req,res)=>{
const params ={}
res.status(200).render('home.pug',params);
})

app.get('/contact',(req,res)=>{
const params ={}
res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
var myData= new contact(req.body);
myData.save().then(()=>{
    res.send("This items has been saved to the database.")
}).catch(()=>{
    res.status(400).send("This item was not saved.")
})
// res.status(200).render('contact.pug');
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});
