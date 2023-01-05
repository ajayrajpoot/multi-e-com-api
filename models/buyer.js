const mongoose = require('mongoose');
const schema = mongoose.Schema;

const buyerSchema = new schema({
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String},
    phone: { type: String },
    password: { type: String },
    address1: { type: String, max: 30},
    address2: { type: String, max: 100 },
    city: { type: String, max: 20 },
    state: { type: String, max: 20 },
    country: { type: String, max: 20 },
    zip: { type: Number },
    active: { type: Boolean},
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('buyer', buyerSchema);

