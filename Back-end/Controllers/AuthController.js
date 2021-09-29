const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../Models/UserModel.js');

const jwt_secret = process.env.JWT_SECRET;

const userRegister = async (req, res) => {
    const {name, surname, email, password, birth, gender} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            surname,
            email,
            password: hashedPassword,
            birth,
            gender
        });

        const token = jwt.sign({
            id: newUser.id,
            email
        }, jwt_secret);

        return res.json({status: 'ok', msg: token});
    } 
    catch(err) {
        if(err.code === 11000) {
            return res.json({status: 'error', msg: 'It exists an account with such email address'});
        }
        return res.json({status: 'error', msg: err.message});
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(user) {
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                return res.json({status: 'error', msg: 'Incorrect password, try again'})
            }
        
            const token = jwt.sign({
                id: user.id,
                email
            }, jwt_secret);

            return res.json({status: 'ok', msg: token});
        }
        else {
            return res.json({status: 'error', msg: 'Incorrect email address or password'});
        }
    }
    catch(err) {
        console.log(err);
        return res.json({status: 'error', msg: err.message});
    }
}

module.exports = { userRegister, userLogin };