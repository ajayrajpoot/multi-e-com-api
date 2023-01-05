const mongoose = require('mongoose');
const schema = mongoose.Schema;

const vanderSchema = new schema({
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address1: { type: String, max: 30, required: true },
    address2: { type: String, max: 100 },
    city: { type: String, max: 20, required: true },
    state: { type: String, max: 20, required: true },
    country: { type: String, max: 20, required: true },
    zip: { type:String,    required: true },
    active: { type: Boolean, required: true },
    create: { type: Date , default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('vander', vanderSchema);