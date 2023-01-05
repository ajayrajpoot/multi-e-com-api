const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartSchema = new schema({
    productId: { type: schema.Types.ObjectId , required: true },
    product_item_id: { type: schema.Types.ObjectId , required: true },
    quantity: { type: String },
    buyerId: { type: String},
    buyerAddresssId:{ type:String},
    shopId: { type: String},
    color: { type: String },
    size: { type: String },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('cart', cartSchema);

