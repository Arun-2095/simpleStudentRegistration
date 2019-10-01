const Express = require('express');
const Database = require('../config/db');
const Mongoose = require('mongoose');

const Student = require('../model/studentModel');

const routers = Express.Router();
// connecting to database

Mongoose.connect(Database.db , { 
    useUnifiedTopology: true,
    useNewUrlParser: true  }).catch(error => handleError(error));

Mongoose.connection.on('error', err => {
        logError(err);
});


routers.get('/',(req,res)=>{
    Student.find({}, (err, data )=>{
        if (err) {
            return handleError(err);
        } 
        if(data) {
            res.send(userMap); 
        }
          
       
    })
    

});

routers.post('/register' , (req, res) =>{
    const student1 = new Student({
        name : req.body.name,
       age  : req.body.age,
       address : {
            street  : req.body.street,
            city   :  req.body.city,
            state  : req.body.state,
            pincode : req.body.pincode
       },
       dob :  req.body.dob,
       fathername : req.body.fathername
       
       });

       student1.save((err,student1)=>{
        if (err) console.log(err);
  
        if (student1) return res.send('data sent');
       }
       );


});

module.exports = routers;