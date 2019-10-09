const Express = require('express');
const Database = require('../config/db');
const Mongoose = require('mongoose');

const Student = require('../model/studentModel');

const routers = Express.Router();

// connecting to database

Mongoose.connect(Database.db , { 
    useUnifiedTopology: true,
    useNewUrlParser: true ,
    useFindAndModify: true }).catch(error => handleError(error));

Mongoose.connection.on('error', err => {
        logError(err);
});

// fetching data 

routers.get('/',(req,res)=>{
    Student.find({}, (err, data )=>{
        if (err) {
            res.json(err);
        } 
        if(data) {
            res.json(data); 
        }
          
       
    })
    

});

// posting data 


routers.post('/register' , (req, res) =>{
   
    const student1 = new Student({
        name : req.body.name,
       age  : req.body.age,
       address : {
            street  : req.body.address.street,
            city   :  req.body.address.city,
            state  : req.body.address.state,
            pincode : req.body.address.pincode
       },
       dob :  req.body.dob,
       fathername : req.body.fathername
       
       });

       student1.save((err,student1)=>{
        if (err) return res.send(err);
  
        if (student1) return res.send('data sent');
       }
       );


});

//updating data 

routers.put('/register/:id' , (req, res) =>{

    const updatedStudent = {
        name : req.body.name,
       age  : req.body.age,
       address : {
            street  : req.body.address.street,
            city   :  req.body.address.city,
            state  : req.body.address.state,
            pincode : req.body.address.pincode
       },
       dob :  req.body.dob,
       fathername : req.body.fathername
       
       };


    Student.findByIdAndUpdate(
           req.params.id ,
           { $set: updatedStudent } ,
            {
            new:true
            },
            function(err, updateddata){
                if(err){
                    res.send('error');
                }
                if(updateddata){
                    res.json(updateddata);
                }

            }

    );
    
});

module.exports = routers;