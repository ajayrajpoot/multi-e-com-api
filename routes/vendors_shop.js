const express = require('express');
const router = express.Router();

const vendor_shop = require('../controllers/vendor_shop');
router.use('/getvendorShop', async (req, res, next) => {
    try {
        const result = await vendor_shop.getVendorShops(req.query.vendor_id);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addvendorshop', async (req, res, next) => {
    try {
        console.log(">>>>", req.body)
        const result = await vendor_shop.addVendorShops(req.body);
        res.json({ result: result.insertId ? true : false, message: "Add new Vendor Shop  ", id: result.insertId });
    } catch (error) {
        next(error);
    }
});


router.post('/updatevendorshop/:id', async (req, res, next) => {
    try {
        console.log("req.params.id ,req.body", req.params.id, req.body)
        // console.log("result", result)
        const result = await vendor_shop.updateVendorShops(req.params.id, req.body);

        console.log("result", result)
        res.json({ result: result.affectedRows ? true : false, message: "vendor shop update success" });
    } catch (error) {
        console.log("error", error)
        next(error);
    }
});

module.exports = router;