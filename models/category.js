const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    iconImage: { type: String },
    name: { type: String, required: true },
    typeId: { type: schema.Types.ObjectId, required: true },
    shopId: { type: schema.Types.ObjectId, required: true },
    active: { type: Boolean, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('category', categorySchema);