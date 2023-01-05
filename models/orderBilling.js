const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OrderBillingSchema = new schema({
    buyer_id: { type: schema.Types.ObjectId },
    order_id: { type: String, required: true },

    total_price: { type: String },
    total_discount: { type: String },
    total_shipping: { type: String },
    total_tax: { type: String },

    status: { type: String },
    comment: { type: String },
    note: { type: String },

    payment_option: { type: String },
    payment_note: { type: String },
    payment_type: { type: String },

    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('orderBilling', OrderBillingSchema);
