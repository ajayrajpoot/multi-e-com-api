const express = require('express');
const router = express.Router();

const smtp = require('../controllers/smtp');

router.use('/getsmtp', async (req, res, next) => {
    try {
        const result = await smtp.getSmtp(req.query);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addsmtp', async (req, res, next) => {
    try {
        const result = await smtp.addSmtp(req.body);
        res.json({ result: result.insertId ? true : false, message: "Add new Vendor ", id: result.insertId });
    } catch (error) {
        next(error);
    }
});

router.post('/updatesmtp/:id', async (req, res, next) => {
    try {
        console.log(">>>>>>>>>", req.body)
        const result = await smtp.updateSmtp(req.body, req.params.id);
        res.json({ result: result.affectedRows ? true : false, message: "smtp id update success" });
    } catch (error) {
        next(error);
    }
});

router.get('/markprimary/:id', async (req, res, next) => {
    try {
        const result = await smtp.markPrimary({}, req.params.id);
        res.json({ result: result.affectedRows ? true : false, message: "SMTP Mark as Primary SMTP." });
    } catch (error) {
        next(error);
    }
});


module.exports = router;