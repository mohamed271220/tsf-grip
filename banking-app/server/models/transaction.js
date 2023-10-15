const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);