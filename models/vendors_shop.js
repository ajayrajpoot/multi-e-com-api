const mongoose = require('mongoose');
const schema = mongoose.Schema;

const shopSchema = new schema({
    vendorId: { type: schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    title: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address1: { type: String, maxLength: 30, required: true },
    address2: { type: String, maxLength: 100 },
    city: { type: String, maxLength: 20, required: true },
    state: { type: String, maxLength: 20, required: true },
    country: { type: String, maxLength: 20, required: true },
    zip: { type: Number, minLength: 6, maxLength: 6, required: true },
    active: { type: Boolean, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('shop', shopSchema);