const express = require('express');
const router = express.Router();

const orderBilling = require('../controllers/orderBilling');
router.use('/getOrderBilling', async (req, res, next) => {
    try {
        const result = await orderBilling.getOrderBilling(req.query.orderId);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addOrderBilling', async (req, res, next) => {
    try {
        const result = await orderBilling.addOrderBilling(req.body);
        res.json({ result: result._id ? true : false, message: "Add new Billing ", id: result._id });
    } catch (error) {
        next(error);
    }
});


router.post('/updateOrderBilling', async (req, res, next) => {
    try {
        const result = await orderBilling.updateOrderBilling(req.body);

        res.json({ result: result._id ? true : false, message: "Billing update success" });
    } catch (error) {
        next(error);
    }
});


router.delete('/deleteOrderBilling', async (req, res, next) => {
    try {
        const result = await OrderBilling.deleteOrderBilling(req.params.id);

        res.json({ result: result._id ? true : false, message: "Billing update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;