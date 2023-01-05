const mongoose = require('mongoose');
const schema = mongoose.Schema;

const smtpSchema = new schema({ 
    smtpServer: { type: String, required: true },
    smtpPort: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: Number, required: true },
    isSsl: { type: Number, required: true },
    shopId: { type: schema.Types.ObjectId, required: true },
    active: { type: Boolean, required: true },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date },
});
module.exports = mongoose.model('smtp', smtpSchema);