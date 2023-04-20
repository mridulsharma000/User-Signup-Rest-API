const express= require('express')
const app= express();
const studentRoute= require('./api/routes/student');
const userRoute= require('./api/routes/user');


const mongoose= require('mongoose');

const bodyParser= require('body-parser');

mongoose.connect('mongodb+srv://mridul211918:Mrid211918@restapi01.r4vnpd0.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('Connection to DB failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('DB connected successfully');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/user', userRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        error: 'BAD URL Request' 
    });
})

module.exports= app;