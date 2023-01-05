
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderItemSchema = new schema({

    order_id: { type: String, required: true },
    
    productId: { type: schema.Types.ObjectId },
    sku: { type: String },
    size: [{ type: String }],
    color: [{ type: String }],
    stock: [{ type: String }],
    price: { type: String },
    isPriceIncludingDiscount: { type: Boolean },
    isPriceIncludingTax: { type: Boolean },
    isDiscount: { type: String },
    discount: { type: String },
    tax: { type: String },
    offer: { type: Boolean },
    description: { type: String },
    productImage: [{ type: String }],

});
module.exports = mongoose.model('orderItem', orderItemSchema);