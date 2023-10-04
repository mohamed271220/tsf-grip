const User = require("../models/user")
const Transaction = require("../models/transaction");
const { default: mongoose } = require("mongoose");

exports.getUsers = async (req, res) => {
    const { max, search } = req.query;
    try {
        if (max) {
            const users = await User.find().populate('transactions').limit(parseInt(max))
            res.status(200).json({ users })
        } else if (search) {
            const users = await User.find({ name: { $regex: search } }).populate('transactions')
            res.status(200).json({ users })
        } else if (max && search) {
            const users = await User.find({ name: { $regex: search } }).populate('transactions').limit(parseInt(max))
            res.status(200).json({ users })
        } else {
            const users = await User.find().populate('transactions')
            res.status(200).json({ users })
        }
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id).populate('transactions')
        res.status(200).json({ user })
    }
    catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.status(200).json({ transactions })
    }
    catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getTransactionById = async (req, res) => {
    const id = req.params.id
    try {
        const transaction = await Transaction.findById(id)
        res.status(200).json({ transaction })
    }
    catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.postTransaction = async (req, res) => {
    const { amount, from, to } = req.body
    try {
        const fromUser = await User.findById(from)
        const toUser = await User.findById(to)
        if (!fromUser || !toUser) {
            throw new Error("User not found")
        } else {
            const sess = await mongoose.startSession()
            sess.startTransaction()
            const transaction = new Transaction({
                from: fromUser,
                to: toUser,
                amount: amount
            })
            await transaction.save({ session: sess })
            fromUser.transactions.push(transaction)
            toUser.transactions.push(transaction)
            fromUser.balance -= amount
            toUser.balance += amount
            await fromUser.save({ session: sess })
            await toUser.save({ session: sess })
            await sess.commitTransaction();
            //TODO create and invoice pdf and send it over email and to user page 
            res.status(200).json({ transaction })
        }
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

