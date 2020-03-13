const express = require('express');
const app = express();
const path = require('path');
const {port} = require('./config');
const db = require("./helper/db");
const mainRouter = require('./routes/main');


db();

app.use(express.static(path.resolve(__dirname,'public')));
app.set('views', path.resolve(__dirname,"views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));


app.use('/', mainRouter);


app.listen(port,() => console.log('server is runing........'));
