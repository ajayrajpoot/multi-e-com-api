const Order = require('../models/order');
const Cart = require('../models/cart');
const OrderItem = require('../models/orderItem');
const OrderBuyers = require('../models/orderBuyers');
const OrderBilling = require('../models/orderBilling');
const BuyerAddress = require('../models/buyerAddress');
const Activity = require('../models/activity');

const getOrder = async (buyerId) => {
    // console.log(">>>>>", mongoose.Types.ObjectId(buyerId))
    const order = await Order.getOrder(buyerId);
    // const order = await Order.getOrder(buyerId);
    // from: "orderitems",
    // from: "orderbillings",
    // from: "orderbuyers",
    console.log(">>>>>", order)

    return order;
}

const addOrder = async (body) => {

    try {

        console.log("body-->", body)
        let orderId = +new Date();

        const cart = await Cart.getCart(body.buyerId);
        // const order = await Order.getOrder(body.buyerId);


        let totalPrice = 0;
        let totalTax = 0;

        let totalDiscount = 0;
        let totalShipping = 0;
        let totalQuantity = 0;

        console.log("cart", cart)

        const orderItem = [];
        cart.map(async data => {
            console.log("orderItem-->", data)
            const orderItems = await OrderItem.getOrderItem(data.product_item_id);

            if (orderItems.length) {
                // console.log("data.orderItem-->", data.orderItem)

                const price = Number(orderItems[0].price || 0);

                totalQuantity += Number(quantitys);
                totalPrice += price;
                totalTax += orderItems[0].isPriceIncludingTax ? 0 : (price * Number(orderItems[0].tax || 0) / 100);
                totalDiscount += orderItems[0].isPriceIncludingDiscount ? 0 : (price * Number(orderItems[0].discount || 0) / 100);
                totalShipping += orderItems[0].isPriceIncludingShipping ? 0 : Number(orderItems[0].shipping || 0);

                orderItems[0].order_id = orderId;
                orderItems[0].productItemId = orderItems[0]._id;
                orderItems[0].product = products;

                delete orderItems[0]._id;
                orderItem.push(orderItems[0]);
            }

        });

        console.log("final  orderItem", orderItem);

        // save order
        let orderObj = {
            order_id: orderId,
            billing_id: null,
            tracking_id: null,

            delivery_date: null,
            quantity: totalQuantity,
            total_discount: totalDiscount,
            total_price: totalPrice,
            total_selling_price: totalShipping,
            tax: totalTax,
            final_amount: totalPrice + totalShipping - totalDiscount - totalTax,
            status: 1,
            is_booked: 1,
            is_cancel: 0,
            is_delivered: 0,
            expected_delivery_date: null,
            delivered_date: null,
            cancel_date: null,

            buyer_id: body.buyer_id
        }

        const addOrder = await Order.addOrder(orderObj);
        // const result = await order.save();

        console.log("save order >>>>>>>>>", result._id);

        //save Order Item 
        let roItem = []
        for (const i of orderItem) {
            const r = await OrderItem.addOrderItem(i);
            roItem.push(r);
        }


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

        const bill = await OrderBilling.addOrderBilling(billingObj);
        // const bill = await orderBilling.save();

        //Address
        const buyerAddress = await BuyerAddress.getBuyerAddress(body.buyer_address_id);
        console.log("buyerAddress-->", buyerAddress)

        let addressObj = {

            order_id: orderId,
            buyer_address_id: buyerAddress[0]._id,
            buyer_id: buyerAddress[0].buyer_id,
            name: buyerAddress[0].name,
            address1: buyerAddress[0].address1,
            address2: buyerAddress[0].address2,
            landmark: buyerAddress[0].landmark,
            city: buyerAddress[0].city,
            state: buyerAddress[0].state,
            country: buyerAddress[0].country,
            zip: buyerAddress[0].zip,
            active: buyerAddress[0].active,
        };

        const orderBuyerRes = new OrderBuyers.addOrderBuyers(addressObj);
        // const orderBuyerRes = await orderBuyer.save();

        let dCart = await Cart.deleteCart(body.buyerId, 0);

        return { result, orderId, addOrder, roItem, bill, orderBuyerRes, dCart };

    } catch (error) {

        console.log("error", error.message || error);
        throw error;

    }
}
const updateOrderStatus = async (params) => {
    let obj = {};
    if (params.state) {
        obj.state = params.state;
    }
    if (params.payment_status) {
        obj.payment_status = params.payment_status;
    }
    const result = await Order.update({ order_id: params.order_id }, obj);

}

const updateOrder = async (body) => {
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

module.exports = { getOrder, addOrder, updateOrder, updateOrderStatus }