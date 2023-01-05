const Order = require('../models/order');
const Cart = require('../models/cart');
const OrderItem = require('../models/orderItem');
const OrderBuyers = require('../models/orderBuyers');
const OrderBilling = require('../models/orderBilling');
const BuyerAddress = require('../models/buyerAddress');

// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

const getOrder = async (buyerId) => {
    // console.log(">>>>>", mongoose.Types.ObjectId(buyerId))
    const order = await Order.aggregate(
        [
            { $match: { buyer_id: buyerId } },
            // { $match: { buyer_id: mongoose.Types.ObjectId( buyerId) } },
            // { $addFields: { "product_item_id0": { "$toObjectId": "$product_item_id" } } },
            {
                $lookup: {
                    from: "orderitems",
                    foreignField: "order_id",
                    localField: "order_id",
                    as: "orderItem"
                }
            },
            {
                $lookup: {
                    from: "orderbillings",
                    foreignField: "order_id",
                    localField: "order_id",
                    as: "orderBilling"
                }
            },
            {
                $lookup: {
                    from: "orderbuyers",
                    foreignField: "order_id",
                    localField: "order_id",
                    as: "orderBuyer"
                }
            }

        ]
    );
    console.log(">>>>>", order)

    return order;
}

const addOrder = async (body) => {

    try {

        let orderId = +new Date();

        const cart = await Cart.aggregate(
            [
                { $match: { buyerId: body.buyer_id } },
                {
                    $lookup: {
                        from: "productitems",
                        foreignField: "_id",
                        localField: "product_item_id",
                        as: "orderItem"
                    }
                }

            ]
        );

        /**
        * [{"_id":"634ab837cdb7dab412d8e43e","productId":"6337cd9bb1834296510a4f46","product_item_id":"634ab0fbf3bddef467e471f8","quantity":"1","buyerId":"634841d4397a19c3ee66264f","shopId":"6337cd9bb1834296510a4f46",
        * "color":"red","size":"r","create":"2022-10-15T13:40:07.521Z","__v":0,
        * "orderItem":[{"_id":"634ab0fbf3bddef467e471f8","productId":"6337cd9bb1834296510a4f46","sku":"sku",
        * "size":["1"],"color":["red"],"stock":["10"],"price":"500","isPriceIncludingDiscount":true,
        * "isPriceIncludingTax":true,"isDiscount":"false","discount":"0","tax":"0",
        * "offer":true,"description":"descrive","productImage":[],"__v":0}]}]
        * 
        */

        let totalPrice = 0;
        let totalTax = 0;

        let totalDiscount = 0;
        let totalShipping = 0;
        let totalQuantity = 0;

        console.log("cart", cart)

        const orderItem = [];
        cart.map(data => {
            // console.log("orderItem-->", data)

            if (data.orderItem.length) {
                // console.log("data.orderItem-->", data.orderItem)

                const price = Number(data.orderItem[0].price || 0);

                totalQuantity += Number(data.quantity);
                totalPrice += price;
                totalTax += data.orderItem[0].isPriceIncludingTax ? 0 : (price * Number(data.orderItem[0].tax || 0) / 100);
                totalDiscount += data.orderItem[0].isPriceIncludingDiscount ? 0 : (price * Number(data.orderItem[0].discount || 0) / 100);
                totalShipping += data.orderItem[0].isPriceIncludingShipping ? 0 : Number(data.orderItem[0].shipping || 0);

                data.orderItem[0].order_id = orderId;
                data.orderItem[0].productItemId = data.orderItem[0]._id;

                delete data.orderItem[0]._id;
                orderItem.push(data.orderItem[0]);
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

        const order = new Order(orderObj);
        const result = await order.save();

        console.log("save order >>>>>>>>>", result._id);

        //save Order Item 
        const roItem = await OrderItem.insertMany(orderItem)


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
        const bill = await orderBilling.save();

        //Address
        const buyerAddress = await BuyerAddress.find({ _id: body.buyer_address_id });
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

        const orderBuyer = new OrderBuyers(addressObj);
        const orderBuyerRes = await orderBuyer.save();

        return { result, orderId, orderObj, orderItem, billingObj, orderBuyerRes };
    } catch (error) {

        console.log("error", error.message || error)
        throw error;
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

const deleteOrder = async (orderId) => {
    try {
        const resultOrder = await Order.deleteOne({ order_id: orderId });
        const resultOrderItem = await OrderItem.deleteOne({ order_id: orderId });
        const resultOrderBilling = await OrderBilling.deleteOne({ order_id: orderId });
        const resultOrderBuyer = await OrderBuyer.deleteOne({ order_id: orderId });

        console.log("delete result")
        return { resultOrder, resultOrderItem, resultOrderBilling, resultOrderBuyer };
    } catch (error) {
        throw error;
    }
}

module.exports = { getOrder, addOrder, updateOrder, deleteOrder }