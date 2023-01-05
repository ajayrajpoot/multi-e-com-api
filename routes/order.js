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
        res.json({rr: result,  result: result.result._id ? true : false, message: "Add new Vendor ", id: result.result._id });
    } catch (error) {
        next(error);
    }
});


router.post('/updateorder', async (req, res, next) => {
    try {
        const result = await Order.updateOrder(req.body);

        res.json({ result: result._id ? true : false, message: "type id update success" });
    } catch (error) {
        next(error);
    }
});


router.delete('/deleteorder/:orderId', async (req, res, next) => {
    try {
        const response = await Order.deleteOrder(req.params.orderId); 

        res.json({ response, result:   true  , message: "type id update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;