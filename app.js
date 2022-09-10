require("dotenv").config()

const express = require('express');
const app = express();
const recipecreate = require('./routes/recipe')
const cors = require('cors');
const Userroutes = require('./routes/user')
const mongoose = require('mongoose')
const port = process.env.port|| 3000
const logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
// use recipe router
app.use(recipecreate);
// use user router
app.use(Userroutes)
mongoose.connect(
    process.env.MONGODB_CONNECT
).then(console.log('database is connected'))
.catch(err=>console.log(err))

app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})

