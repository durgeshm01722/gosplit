import express from "express";
import { registerUser, loginUser, getAllUsers, getUser } from "../controllers/users.js";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../controllers/transactions.js";
import protect from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/createTransaction/:action", protect, createTransaction);
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", protect, getAllUsers);
router.get("/getUserData", protect, getUser);
router.get("/transactions", protect, getTransactions);

router.delete("/deleteTransaction/:transactionID", protect, deleteTransaction);

router.patch("/updateTransaction/:transactionID", protect, updateTransaction);

export default router;