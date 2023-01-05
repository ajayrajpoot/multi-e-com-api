const express = require('express');
const router = express.Router();

const smtp = require('../controllers/smtp');
router.use('/getsmtp', async (req, res, next) => {
    try {
        const result = await smtp.getSmtp(req.query.shopId);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addsmtp', async (req, res, next) => {
    try {
        const result = await smtp.addSmtp(req.body);
        res.json({ result: result._id ? true : false, message: "Add new Vendor ", id: result._id });
    } catch (error) {
        next(error);
    }
});


router.post('/updatesmtp/:id', async (req, res, next) => {
    try {
        console.log(">>>>>>>>>",req.body)
        const result = await smtp.updateSmtp(req.body, req.params.id);
        res.json({ result: result.modifiedCount ? true : false, message: "smtp id update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;