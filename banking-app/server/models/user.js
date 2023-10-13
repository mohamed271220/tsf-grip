const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: false
    }],
    socialId: {
        type: String,
        required: true

    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);