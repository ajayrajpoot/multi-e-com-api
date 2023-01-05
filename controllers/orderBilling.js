const Order = require('../models/order'); 
const OrderBilling = require('../models/orderBilling');

const getOrderBilling = async (orderId) => {

    const billing = await OrderBilling.find({ order_id:orderId });

    return billing;
}

const addOrderBilling = async (body) => {

    try {

        // billing
        let billingObj = {
            buyer_id: body.buyer_id,
            order_id: orderId,

            total_price: totalPrice,
            total_tax: totalTax,
            total_discount: totalDiscount,
            total_shipping: totalShipping,

            status: null,
            comment: null,
            note: null,
            payment_option: null,
            payment_note: null,
            payment_type: null
        }
        
        const orderBilling = new OrderBilling(billingObj);
        const result = await orderBilling.save(); 

        return result;
    } catch (error) {
        
        console.log("error", error.message || error)
        throw error;
    }
}

const updateOrderBilling = async (body) => {
    try {
        const params = JSON.parse(JSON.stringify(body));
        delete params._id;
        const result = await Order.update(params, body._id);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}


const deleteOrderBilling = async (id) => {
    try {
        const result = await OrderBilling.deleteOne({ _id: id });

        console.log("delete result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getOrderBilling, addOrderBilling, updateOrderBilling, deleteOrderBilling }