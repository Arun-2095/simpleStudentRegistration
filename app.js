const Express = require('express');
const Cors   =require('cors');
const BodyParser = require('body-parser');
const student = require('./api/student');
const path = require('path');


const app = Express();
const port = process.env.port || 5000 ;

app.listen(5000, ()=>{
  console.log(`server ready ${port}`);
});

// cross origin resource sharing 
app.use(Cors());

//handling the Json 
app.use(BodyParser.json());

// static file loading




// API
app.use('/student', student);