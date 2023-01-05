const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productItemSchema = new schema({
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
    productImage1: { type: String },
    productImage2: { type: String },
    productImage3: { type: String },
    productImage4: { type: String },
});

module.exports = mongoose.model('productItem', productItemSchema);