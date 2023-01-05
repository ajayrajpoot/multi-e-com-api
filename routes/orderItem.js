const express = require('express');
const router = express.Router();

const OrderItems = require('../controllers/orderItems.js');
router.use('/getorderitems', async (req, res, next) => {
    try {
        const result = await OrderItems.getOrderItems(req.query.orderId);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addorderitems', async (req, res, next) => {
    try {
        const result = await OrderItems.addOrderItems(req.body);
        res.json({ result: result._id ? true : false, message: "Add new Vendor ", id: result._id });
    } catch (error) {
        next(error);
    }
});


router.post('/updateorderitem', async (req, res, next) => {
    try {
        const result = await OrderItems.updateOrderItem(req.body);

        res.json({ result: result._id ? true : false, message: "type id update success" });
    } catch (error) {
        next(error);
    }
});


router.delete('/deleteorderitem/:id', async (req, res, next) => {
    try {
        const result = await OrderItems.deleteOrderItem(req.params.id);

        res.json({ result: result._id ? true : false, message: "type id update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;