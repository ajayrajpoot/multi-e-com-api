
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ticketSchema = new schema({
    iconImage: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    catogory: { type: Number, required: true },
    client_admin: { type: Boolean, required: true },
    craeted_by: { type: Number },
    closing_date: { type: Date },
    opening_date: { type: Date },
    active: { type: Boolean, required: true },
    open_cloased: { type: Number },
    unread_client: { type: Number },
    unread_admin: { type: Number },
    shopId: { type: Number, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('ticket', ticketSchema);