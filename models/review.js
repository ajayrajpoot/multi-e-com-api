
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reviewSchema = new schema({

    image: { type: String },
    name: { type: String },
    comment: { type: String },
    rating: { type: String },
    type: { type: String },
    shop_or_product_id: { type: String },
    time: { type: String },
    buyer_id: { type: String },
    likes: { type: String },
    dislikes: { type: String },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },

});
module.exports = mongoose.model('review', reviewSchema);