import express from "express";
import transactionDataModel from "../models/transactionModel.js"
import dataModel from "../models/data.js";
import userDataModel from "../models/userModel.js";

const router = express.Router();

export const getTransactions = async (req, res) => {
    const transactions = await transactionDataModel.find({$or:[{requester: req.user.username},{requestTo: req.user.username}]});
    res.send(transactions);
}

export const createTransaction = async (req, res) => {
    try {
        const data = await dataModel.find({});
        const receiver = await userDataModel.find({username: req.body.requester});
        const transactionData = new transactionDataModel({
            transactionID: data[0].transactionsCount+1,
            requester: req.body.requester,
            requestTo: req.body.requestTo,
            date: req.body.date,
            description: req.body.description,
            amount: req.body.amount
        })
        transactionData.save();
        if(req.body.requestTo!==req.body.requester){
            console.log("I am executed!");
            await userDataModel.updateOne({username: req.user.username}, {totalBalance: parseInt(req.body.totalBalance), totalAmountSpent: parseInt(req.body.totalAmountSpent), budgetRemaining: parseInt(req.body.budgetRemaining)});
            await userDataModel.updateOne({username: req.body.requester}, {totalBalance: receiver.totalBalance+parseInt(req.body.amount), budgetRemaining: receiver.budgetRemaining+parseInt(req.body.amount)});
        }
        const count = await dataModel.find({});
        await dataModel.updateOne({_id: "63b784d073c7642b4e0795fc"}, {transactionsCount: count[0].transactionsCount+1});
        res.send("success");
    }
    catch (err) {
        console.log(err);
        res.send("error");
    }
}

export const deleteTransaction = async (req, res) => {
    transactionDataModel.deleteOne({transactionID: req.params.transactionID}, (err)=>{
        if(err){
            res.send("error");
        }
        else{
            res.send("success");
        }
    })
}

export const updateTransaction = async (req, res) => {
    transactionDataModel.updateOne({transactionID: req.params.transactionID}, {description: req.body.description} , (err)=>{
        if(err){
            res.send("error")
        }
        else{
            res.send("success");
        }
    })
}

export default router;