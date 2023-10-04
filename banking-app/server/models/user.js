const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true, min: 2, max: 50 },
    balance: {
        type: Number,

        default: 0

    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required:false
    }],
    socialId: {
        type: String,
        required: true

    }
}, {
    timestamps: true
})
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);