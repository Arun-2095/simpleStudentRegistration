const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const studentSchema = new Schema ({
name : { type: String, required: true},
age  : { type: Number , required: true },
address : {
     street  : { type: String , required: true },
     city   :  { type: String , required: true },
     state  : { type: String , required: true },
     pincode : { type: Number, required: true}
},
dob  : {type :Date , required: true},
fathername : {type :String , required: true}

});

const Student = module.exports = mongoose.model('tenthStudents' , studentSchema , 'tenthStudent' );
