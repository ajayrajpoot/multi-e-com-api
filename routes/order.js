const express = require('express');
const router = express.Router();

const Order = require('../controllers/order.js');

router.post('/getorder', async (req, res, next) => {
    try {
        const buyerID = req.body.buyerId || 0;
        const shopID = req.body.shopID || 0;
        const previous = req.body.previous || false;
        const next = req.body.next || false;
        const pagesize = req.body.pagesize || 10;
        const page = req.body.page || 1;

        const result = await Order.getOrder({ shopID, buyerID }, previous, next, pagesize, page);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.get('/getorderdetail', async (req, res, next) => {
    try {
        const orderID = req.query.orderID;

        const result = await Order.getOrderDetail(orderID);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/placeorder', async (req, res, next) => {
    try {
        console.log("placeorder", req.body)
        const result = await Order.addOrder(req.body);
        res.json({ rr: result, result: false, message: "Place Order ", id: 'insertId' });
    } catch (error) {
        next(error);
    }
});

router.post('/updateorderstatus', async (req, res, next) => {
    try {
        if(!req.body.orderID) {
            throw new Error('orderID is Required');
        }
        if(!req.body.status && !req.body.payment_status) {
            throw new Error('Require payment_status or status');
        }
        const result = await Order.updateOrderStatus(req.body);
        // console.log(result);
        let msg = req.body.status? 'Update Order Status':(req.body.payment_status?'Update Payment Status':'');
        res.json({ rr: result, result: result.affectedRows ? true : false, message: msg });
    } catch (error) {
        next(error);
    }
});

router.post('/updateorder', async (req, res, next) => {
    try {
        const result = await Order.updateOrder(req.body);
        res.json({ result: result.insertId ? true : false, message: "Order update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;