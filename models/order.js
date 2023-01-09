
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderSchema = new schema({
    buyer_id: { type: schema.Types.ObjectId },
    order_id: { type: String , require:true},
    
    billing_id: { type: String },
    tracking_id: { type: String },
    product_id: { type: schema.Types.ObjectId },
    product_item_id: { type: schema.Types.ObjectId },
    order_date: { type: Date, required: true, default: Date.now  },
    delivery_date: { type: String },
    tax: { type: String },
    buyer_instructed: { type: String },
    amount: { type: String },
    quantity: { type: String },
    discount: { type: String },
    total_price: { type: String },
    prduct_detail: { type: String },
    Seller_Comment: { type: String },
    status: { type: String, enum: ['PROCESSING', 'BOOKED',"IN TRANSIT","ONHOLD", "DELIVERED","CANCELED", "RTO", "FAILED", "REFUNDED"] },
    payment_status: { type: String, enum: [ "PENDING","PROCESSING", "COMPLEAT",  "REFUNDED",] },
    buyer_id: { type: String },
    payment_detail: { type: String },
    payment_recipte: { type: String },
    payment_slip_code: { type: String },
    order_code: { type: String },
    is_booked: { type: String },
    selling_price: { type: String },
    shipping_charges: { type: String },
    is_cancel: { type: String },
    is_delivered: { type: String },
    expected_delivery_date: { type: String },
    delivered_date: { type: String },
    cancel_date: { type: String },
    heigth: { type: String },
    width: { type: String },
    length: { type: String },
    unit: { type: String },
    request_data: { type: String },
    create: { type: Date, required: true, default: Date.now },
    update: { type: Date, required: true, default: Date.now  },
} ,{
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    update: { currentTime: () =>  Date.now()   }
  });
module.exports = mongoose.model('order', orderSchema);
