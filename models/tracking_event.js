const mongoose = require('mongoose');
const schema = mongoose.Schema;

const activitySchema = new schema({
    tracking_data_id: { type: String, required: true },
    awb: { type: String, required: true },
    carrier_status: { type: String },
    carrier_event: { type: String },
    status: { type: String },
    event: { type: String },
    visible: { type: Boolean },
    create_at: { type: Boolean, default: true , required: true, default: Date.now},
    updtae_at: { type: Boolean, default: true, required: true, default: Date.now},
    event_date: { type: Date },
});
module.exports = mongoose.model('activity', activitySchema);

