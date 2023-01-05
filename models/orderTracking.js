const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartSchema = new schema({
    order_id: { type: String, required: true },
    product_id: { type: String, required: true },
    product_item_id: { type: String, required: true },
    quantity: { type: String },
    buyer_id: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});

module.exports = mongoose.model('cart', cartSchema);