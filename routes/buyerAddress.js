const express = require('express');
const router = express.Router();

const buyerAddress = require('../controllers/buyerAddress');

router.get('/getbuyeraddress', async (req, res, next) => {
    try {
        const result = await buyerAddress.getBuyerAddress(req.query.buyerId);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addbuyeraddress', async (req, res, next) => {
    try {
        console.log(">>>", req.body)

        const result = await buyerAddress.addBuyerAddress(req.body);
        res.json({ result: result.insertId ? true : false, message: "Add new Vendor ", id: result.insertId });
    } catch (error) {
        console.log('error', error.message || error)
        next(error);
    }
});


router.post('/updatebuyeraddress/:id', async (req, res, next) => {
    try {

        const result = await buyerAddress.updateBuyerAddress(req.body, req.params.id);

        res.json({ result: result.affectedRows ? true : false, message: "buyer address update success" });
    } catch (error) {
        console.log('error', error.message || error)
        next(error);
    }
});

router.delete('/deletebuyeraddress/:id', async (req, res, next) => {
    try {
        const result = await buyerAddress.deleteBuyerAddress(req.params.id);
        res.json({ result: result.affectedRows ? true : false, message: "delete buyer success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;