const express = require('express');
const router = express.Router();

const Buyer = require('../controllers/buyer.js');

router.use('/getbuyer', async (req, res, next) => {
    try {

        const result = await Buyer.getBuyer({});
        res.json({ result: true, message: "", data: result });

    } catch (error) {
        console.log("error", error)
        next(error);
    }
});

router.post('/addbuyer', async (req, res, next) => {
    try {
        const result = await Buyer.addBuyer(req.body);
        console.log(">>", result);
        res.json({ result: result.insertId ? true : false, message: "Add new Vendor ", id: result.insertId });
    } catch (error) {
        next(error);
    }
});


router.post('/updatebuyer/:id', async (req, res, next) => {
    try {
        const result = await Buyer.updateBuyer(req.body, req.params.id);

        res.json({ result: result.affectedRows ? true : false, message: "buyer update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;