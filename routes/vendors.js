const express = require('express');
const router = express.Router();

const vendors = require('../controllers/vendors.js');
router.get('/getVendors', async (req, res, next) => {
    try {
        console.log("req.query.id", req.query.id)
        const result = await vendors.getVendors(req.query.id);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addVendor', async (req, res, next) => {
    try {
        console.log("req.body", req.body)
        const result = await vendors.addVendors(req.body);
        res.json({ result: result.insertId ? true : false, message: "Add new Vendor ", id: result.insertId });
    } catch (error) {
        next(error);
    }
});


router.post('/updateVendor/:id', async (req, res, next) => {
    try {
        
        const result = await vendors.updateVendor(req.params.id, req.body);

        console.log("result", result)
        res.json({ result: result.affectedRows ? true : false, message: "vendor id update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;