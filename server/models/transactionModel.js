import mongoose from "mongoose";

const transactionDataSchema = new mongoose.Schema({
    transactionID: {
        type: Number,
        required: true
    },
    requester: {
        type: String,
        required: true
    },
    requestTo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const transactionDataModel = mongoose.model("Transaction", transactionDataSchema);

export default transactionDataModel;