const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const loginHandle = async(req,res) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message : "All feilds require"})
    }

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message : "Use not found"})
    }

    const checkPassword = await bcrypt.compare(password, User.password)
    if(!checkPassword){
        return res.status(400).json({message : "incorrect password"})
    }

    const token = jwt.sign({email}, "expensemanager",{expiresIn: "1hr"})

    res.status(200).json({
        message: "login successfull",
        id : user._id,
        name : user.name,
        token : token
    })

}

const registerHandle = async (req,res) => {
    try{
        const {name, email, password} = req.body

    if(!email || !password || !name){
        return res.status(400).json({message : "All feilds require"})
    }

    const alreadyExist = await User.findOne({email})

    if(alreadyExist){
        return res.status(400).json({message : "user alredy exist"})
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPass = bcrypt.hashSync(password, salt)

    const newUser = await User.create({
        name,
        email,
        password : hashedPass
    })

    res.status(200).json({message:"user created successfully" , newUser})
    } catch(error) {
        return res.status(500).json({message:"internal server error"})

    }
}

module.exports = {
    loginHandle, registerHandle
}