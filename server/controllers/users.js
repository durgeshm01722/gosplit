import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userDataModel from "../models/userModel.js"
import dataModel from "../models/data.js";


const router = express.Router();

export const registerUser = async (req, res) => {
    const { username, password, name, email } = req.body;
    const userExists = await userDataModel.findOne({username});
    if(userExists){
        res.send("user already exists");
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new userDataModel({
            username: username,
            hPassword: hashedPassword,
            password: password,
            name: name,
            email: email,
            totalBalance: 50000,
            totalAmountSpent: 0,
            budgetRemaining: 50000
        })
        user.save().then(async ()=>{
            res.send({
                username: user.username,
                name: user.name,
                email: user.email,
                token: generateToken(user.username),
                totalBalance: user.balance,
                totalAmountSpent: user.totalAmountSpent,
                budgetRemaining: user.budgetRemaining
            });
            await dataModel.updateOne({_id: "63b784d073c7642b4e0795fc"}, {$push:{users: username}});
        })
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await userDataModel.findOne({username});
    if(user && (await bcrypt.compare(password, user.hPassword))){
        res.json({
            username: user.username,
            name: user.name,
            email: user.email,
            token: generateToken(user.username),
            totalBalance: user.balance,
            totalAmountSpent: user.totalAmountSpent,
            budgetRemaining: user.budgetRemaining
        })
    }
    else{
        res.send("invalid user");
    }
}

export const getUser = async (req, res) => {
    const { username, name, email, totalBalance, totalAmountSpent, budgetRemaining } = await userDataModel.findOne({username: req.user.username});
    res.json({
        username,
        name,
        email,
        totalBalance,
        totalAmountSpent,
        budgetRemaining
    })
}

export const getAllUsers = async (req, res) => {
    const users = await userDataModel.find({});
    const Res = [];
    users.forEach((item)=>{
        Res.push({username: item.username, name: item.name});
    })
    res.send(Res);
}

const generateToken = (username) => {
    return jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET);
}

export default router;