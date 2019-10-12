const Express = require('express');
const Cors   =require('cors');
const BodyParser = require('body-parser');
const student = require('./api/student');
const path = require('path');


const app = Express();
const port = process.env.port || 5000 ;



// cross origin resource sharing 
app.use(Cors());

//handling the Json 
app.use(BodyParser.json());

// static file loading

app.use(Express.static(path.join(__dirname + '/public')));

// API
app.use('/student', student);

app.get('*',(req,res)=>{
  res.sendfile(path.join(__dirname,'public/index.html'));
});

app.listen(5000, ()=>{
  console.log(`server ready ${port}`);
});