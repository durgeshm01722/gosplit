import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    transactionsCount: {
        type: Number,
    },
    users: {
        type: [String],
    }
})

const dataModel = mongoose.model("Data", dataSchema);

export default dataModel;