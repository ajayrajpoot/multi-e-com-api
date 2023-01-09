const mongoose = require('mongoose');
const schema = mongoose.Schema;

const activitySchema = new schema({
    node: { type: String, required: true },
    type: { type: String, enum:['admin', 'buyer', 'shop'] },
    add_by: { type: Boolean, default: true},
    visibility: { type: Boolean, default: true},
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('activity', activitySchema);

