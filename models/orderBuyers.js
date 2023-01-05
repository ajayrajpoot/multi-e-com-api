const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderBuyersSchema = new schema({
    order_id: { type: String, required: true },

    buyer_address_id: { type: schema.Types.ObjectId, required: true },
    buyer_id: { type: schema.Types.ObjectId, required: true },

    name: { type: String, required: true },
    address1: { type: String, max: 30, required: true },
    address2: { type: String, max: 100 },
    landmark: { type: String, max: 100 },
    city: { type: String, max: 20, required: true },
    state: { type: String, max: 20, required: true },
    country: { type: String, max: 20, required: true },
    zip: { type: Number, required: true },
    active: { type: Boolean, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date }
    
});
module.exports = mongoose.model('orderBuyers', orderBuyersSchema);