const express = require('express');
const router = express.Router();

const vendor_shop = require('../controllers/vendor_shop');
router.use('/getvendorShop', async (req, res, next) => {
    try {
        const result = await vendor_shop.getVendorshop(req.query);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addvendorshop', async (req, res, next) => {
    try {
        console.log(">>>>", req.body)
        const result = await vendor_shop.addVendorshop(req.body);
        res.json({ result: result._id ? true : false, message: "Add new Vendor Shop  ", id: result._id });
    } catch (error) {
        next(error);
    }
});


router.post('/updatevendorshop/:id', async (req, res, next) => {
    try {
        console.log("req.params.id ,req.body", req.params.id, req.body)
        // console.log("result", result)
        const result = await vendor_shop.updateVendorshop(req.params.id, req.body);

        console.log("result", result)
        res.json({ result: result.modifiedCount ? true : false, message: "vendor shop update success" });
    } catch (error) {
        console.log("error", error)
        next(error);
    }
});

module.exports = router;