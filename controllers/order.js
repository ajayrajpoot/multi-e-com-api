const Order = require('../models/order');
const Cart = require('../models/cart');
const ProductItem = require('../models/productItem');
const OrderItem = require('../models/orderItem');
const OrderBuyers = require('../models/orderBuyers');
const OrderBilling = require('../models/orderBilling');
const BuyerAddress = require('../models/buyerAddress');
const ActivityLogs = require('./activity_logs');

const getOrder = async (filter, previous = false, next = true, pagesize = 10, page = 1) => {

    try {

        let limit = pagesize;
        const offset = pagesize * (page - 1);

        const orders = await Order.getOrder(filter, (limit + 1), offset);

        if (orders.length <= pagesize) { next = false; } else { next = true; }
        if (page == 1) { previous = false; } else { previous = false; }

        return { orders, previous, next, pagesize, page };
    } catch (error) {
        console.log("error", error.message || error)
    }

}

const getOrderDetail = async (orderID) => {
    try {

        const [order] = await Order.getOrderDetail(orderID);
        const [orderBilling] = await OrderBilling.getOrderBilling(orderID);
        const [orderAddres] = await OrderBuyers.getOrderBuyers(orderID);
        const orderItems = await OrderItem.getOrderItem({ orderID });
        // const order = await Order.getOrder(buyerId);
        // from: "orderitems",
        // from: "orderbillings",
        // from: "orderbuyers",
        // console.log(">>>>>", order)

        return { order, orderBilling, orderAddres, orderItems };

    } catch (error) {
        console.error(error.message || error)
        throw new Error(error.message || error);

    }
}

const addOrder = async (body) => {

    try {

        console.log("body-->", body)
        let orderId = 0;

        const cart = await Cart.getCart(body.buyer_id);
        // const order = await Order.getOrder(body.buyerId);


        let totalPrice = 0;
        let totalTax = 0;

        let totalDiscount = 0;
        let totalShipping = 0;
        let totalQuantity = 0;

        console.log("cart", cart)

        const orderItem = [];
        let orderI = cart.map(async data => {
            console.log("orderItem-->", data)
            const orderItems = await ProductItem.getProductItem({ product_item_id: data.product_item_id });
            console.log("data.orderItem-->", orderItems)

            if (orderItems.length) {

                orderItems[0].quantity = data.quantity;
                const price = Number(orderItems[0].price || 0);

                totalQuantity += Number(data.quantity);
                totalPrice += price;
                totalTax += orderItems[0].isPriceIncludingTax ? 0 : (price * Number(orderItems[0].tax || 0) / 100);
                totalDiscount += orderItems[0].isPriceIncludingDiscount ? 0 : (price * Number(orderItems[0].discount || 0) / 100);
                totalShipping += orderItems[0].isPriceIncludingShipping ? 0 : Number(orderItems[0].shipping || 0);

                orderItems[0].order_id = orderId;
                orderItems[0].product_item_id = orderItems[0].id;
                // orderItems[0].product = products;

                delete orderItems[0]._id;
                orderItem.push(orderItems[0]);
            }

        });

        let gg = await Promise.allSettled(orderI)

        console.log("gg >>", gg);
        console.log("final  orderItem", orderItem);

        // save order
        let orderObj = {
            // order_id: orderId,
            // billing_id: null,
            // tracking_id: null,

            // delivery_date: null,
            quantity: totalQuantity,
            total_discount: totalDiscount,
            total_price: totalPrice,
            selling_price: totalShipping,
            tax: totalTax,
            final_amount: totalPrice + totalShipping - totalDiscount - totalTax,
            status: 1,
            is_booked: 1,
            is_cancel: 0,
            is_delivered: 0,
            // expected_delivery_date: null,
            // delivered_date: null,
            // cancel_date: null,
            buyer_id: body.buyer_id,
        }
        console.log("orderObj", orderObj)

        const addOrder = await Order.addOrder(orderObj);
        // const result = await order.save();
        orderId = addOrder.insertId;
        console.log("save order insertId", addOrder.insertId);

        //save Order Item 
        let roItem = []
        for (const i of orderItem) {
            try {
                let oi = {
                    product_id: i.product_id,
                    sku: i.sku,
                    size: i.size,
                    color: i.color,
                    // stock: i.stock,
                    price: i.price,
                    discount: i.discount,
                    tax: i.tax,
                    offer: i.offer,
                    description: i.description,
                    // image1: i.image1,
                    // image2: i.image2,
                    // image3: i.image3,
                    // image4: i.image4,
                    // is_active: i.is_active,
                    quantity: i.quantity,
                    order_id: orderId,
                    product_item_id: i.product_item_id,
                    shop_id: i.shop_id,

                }

                const r = await OrderItem.addOrderItem(oi);
                console.log("save order Item", r.insertId);
                // roItem.push(r);

            } catch (error) {
                console.error("Error", error);
            }
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
        console.info("save order Billing", bill.insertId);

        //Address
        let buyerAddress;
        let orderBuyerRes;
        if (body.address_id) {

            buyerAddress = await BuyerAddress.getBuyerAddress(body.address_id);
            console.info("buyerAddress-->", buyerAddress)

            let addressObj = {

                order_id: orderId,
                address_id: body.address_id,
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

            orderBuyerRes = await OrderBuyers.addOrderBuyers(addressObj);
            console.log("save order  Buyer Address ID", orderBuyerRes.insertId);

        }

        let dCart = await Cart.deleteCart(body.buyerId, 0);

        let resposn = { orderID: addOrder.insertId, billingID: bill.insertId, buyreAddressID: orderBuyerRes.insertId };
        // console.log('resposn: ', resposn)
        return resposn;
    } catch (error) {

        console.log("error", error.message || error);
        throw error;

    }
}
const updateOrderStatus = async (params) => {
    try {
        // console.log("params", params)

        let obj = {};
        if (params.status) {
            obj.status = params.status;
        }
        if (params.payment_status) {
            obj.payment_status = params.payment_status;
        }

        // if (params.comment) {
        //     obj.comment = params.comment;
        // }

        let actiObj = {
            note: 'state: ' + params.state + ', payment_status: ' + params.payment_status + ', comment: ' + params.comment,
            // type: '', 
            // add_by: '',
            order_id: params.orderID,
        }
        await ActivityLogs.addActivityLogs(actiObj);
        const result = await Order.updateOrder(params.orderID, obj);
        return result;

    } catch (error) {
        console.error("Error", error.message || error);
        throw new Error(error.message || error);
    }

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

module.exports = { getOrder, getOrderDetail, addOrder, updateOrder, updateOrderStatus }