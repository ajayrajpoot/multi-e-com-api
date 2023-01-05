const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ticketMassageSchema = new schema({
    ticket_id: { type: String },
    message: { type: Number },
    created_by: { type: String, required: true },
    catogory: { type: Number, required: true },
    client_admin: { type: Boolean, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('ticketMassage', ticketMassageSchema);