const router = require('router');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// register user
const register = async (req,res) => {
    try{
        const userData = req.body;
        const {name, email, password} = userData;
        
        if(!name || !email || !password){
            return res.status(400).json({message: 'Please enter all required fields'});
        }

        const emailExists = await User.findOne({email: email});
        if(!emailExists){
            return res.status(400).json({message: 'Email already exists'});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({message: 'Please enter a valid email'});
        }

        const saltedRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltedRounds);

        const newUser = await User.create({
            name:name,
            email:email,
            password: hashedPassword
        })

        res.status(201).json({message: 'User created successfully', name: newUser.name, email: newUser.email});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};

// login user
const login = async (req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'Please enter all required fields'});
        }

        const emailExists = await User.findOne({email: email});
        if(!emailExists){
            return res.status(400).json({message: 'Email does not exist'});
        }

        const passwordMatch = await bcrypt.compare(password, emailExists.password);
        if(!passwordMatch){
            return res.status(400).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({id: emailExists._id}, "aeroSecretKey", {expiresIn: '1d'});

        res.status(200).json({message: "login successfully!", token: token});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    register,
    login
}