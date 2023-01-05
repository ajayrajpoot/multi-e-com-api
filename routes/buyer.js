const express = require('express');
const router = express.Router();

const Buyer = require('../controllers/buyer.js');

router.use('/getbuyer', async (req, res, next) => {
    try {
        const result = await Buyer.getBuyer();
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addbuyer', async (req, res, next) => {
    try {
        const result = await Buyer.addBuyer(req.body);
        res.json({ result: result._id ? true : false, message: "Add new Vendor ", id: result._id });
    } catch (error) {
        next(error);
    }
});


router.post('/updatebuyer/:id', async (req, res, next) => {
    try {
        const result = await Buyer.updateBuyer(req.body, req.params.id);

        res.json({ result: result.acknowledged, message: "buyer update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;