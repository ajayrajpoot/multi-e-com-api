const mongoose = require('mongoose');
const schema = mongoose.Schema;

const activitySchema = new schema({
    awb: { type: String, required: true },
    carrier: { type: String },
    status: { type: String },
    create_at: { type: Boolean, default: true , required: true, default: Date.now},
    updtae_at: { type: Boolean, default: true, required: true, default: Date.now}
});
module.exports = mongoose.model('activity', activitySchema);

 