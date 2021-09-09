const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./Routes/UserRouter');

dotenv.config();

const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, {
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