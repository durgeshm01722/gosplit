import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hPassword: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    totalBalance: {
        type: Number,
        required: true
    },
    totalAmountSpent: {
        type: Number,
    },
    budgetRemaining: {
        type: Number,
    }
})

const userDataModel = mongoose.model("User", userDataSchema);

export default userDataModel;