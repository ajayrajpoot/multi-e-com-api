const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    iconImage: { type: String },
    shopId: { type: schema.Types.ObjectId, required: true },
    typeId: { type: schema.Types.ObjectId, required: true },
    categoryId: { type: schema.Types.ObjectId, required: true },
    sunCategoryId: { type: schema.Types.ObjectId, required: true },

    title: { type: String },
    discription: { type: String },
    bought: { type: String },

    shipping: { type: String },
    rating: { type: String },
    ratingCount: { type: String },
    buyerGuarantee: { type: String },
    sponsored: { type: Boolean },
    likes: { type: String },
    dislikes: { type: String },
    active: { type: Boolean },

    create: { type: Date, required: true, default: Date.now },
    update: { type: Date }
});
module.exports = mongoose.model('product', productSchema);