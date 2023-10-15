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
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    socialId: {
        type: String,
        required: true

    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);