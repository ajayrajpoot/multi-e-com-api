const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subCategorySchema = new schema({
    iconImage: { type: String },
    name: { type: String, required: true },
    categoryId: { type: String, required: true },
    typeId: { type: String, required: true },
    shopId: { type: Number, required: true },
    active: { type: Boolean, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('subCategory', subCategorySchema);