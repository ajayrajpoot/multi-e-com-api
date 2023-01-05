const mongoose = require('mongoose');
const schema = mongoose.Schema;

const settingSchema = new schema({
    code: { type: String, required: true },
    value: { type: String },
    active: { type: String, required: true },
    discription: { type: String, required: true },
    order_postion: { type: String, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('setting', settingSchema);