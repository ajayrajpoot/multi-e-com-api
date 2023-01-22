const express = require('express');
const router = express.Router();

const Order = require('../controllers/order.js');
router.use('/getorder', async (req, res, next) => {
    try {
        const result = await Order.getOrder(req.query.buyerId);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/placeorder', async (req, res, next) => {
    try {
        const result = await Order.addOrder(req.body);
        res.json({ rr: result, result: result.result.insertId ? true : false, message: "Place Order ", id: result.result.insertId });
    } catch (error) {
        next(error);
    }
});

router.post('/updateorderstatus', async (req, res, next) => {
    try {
        const result = await Order.updateOrderStatus(req.body);
        res.json({ rr: result, result: result.result.insertId ? true : false, message: "Update Order Status.", id: result.result.insertId });
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