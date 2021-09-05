const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routes/UserRouter');

const URL = 'mongodb+srv://niksis02:nikoyan02@cluster0.19sgc.mongodb.net/Nikmedia?retryWrites=true&w=majority';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('db connected successfully');
}).catch(err => {
    console.log('Failed to connect database: ', err);
})

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('Server started on port 5000');
})