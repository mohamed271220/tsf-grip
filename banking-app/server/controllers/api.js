const User = require("../models/user")
const Transaction = require("../models/transaction");
const { default: mongoose } = require("mongoose");

exports.getUsers = async (req, res, next) => {
    const { max, search } = req.query;
    try {
        if (max) {
            const users = await User.find().limit(parseInt(max))
            res.status(200).json({ users })
        } else if (search) {
            const users = await User.find({ name: { $regex: search } })
            res.status(200).json({ users })
        } else if (max && search) {
            const users = await User.find({ name: { $regex: search } }).limit(parseInt(max))
            res.status(200).json({ users })
        } else {
            const users = await User.find()
            res.status(200).json({ users })
        }
    } catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getUser = async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(200).json({ user })
    }
    catch (error) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getTransactions = async (req, res, next) => {
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
exports.getTransactionById = async (req, res, next) => {
    const id = req.params.id
    try {
        // all transactions where user is sender or receiver
        const transactions = await Transaction.find({ $or: [{ from: id }, { to: id }] })
        res.status(200).json({ transactions })
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.postTransaction = async (req, res, next) => {
    const { amount, from, to } = req.body
    console.log(amount, from, to);
    try {
        const fromUser = await User.findById(from).exec()
        const toUser = await User.findById(to).exec()
        if (!fromUser || !toUser) {
            throw new Error("User not found")
        }
        if (fromUser.balance < amount) {
            throw new Error("Insufficient balance")
        }
        const sess = await mongoose.startSession()
        sess.startTransaction()
        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: 'Invalid amount',
            });
        }

        if (fromUser.balance < amount) {
            return res.status(400).json({
                message: 'Insufficient balance',
            });
        }

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
        fromUser.balance = Number(fromUser.balance); // cast to number
        toUser.balance = Number(toUser.balance);
        await fromUser.save({ session: sess })
        await toUser.save({ session: sess })
        await sess.commitTransaction();
        //TODO create and invoice pdf and send it over email and to user page 
        res.status(200).json({ transaction })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

