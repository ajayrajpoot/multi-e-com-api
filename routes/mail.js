const express = require('express');
const router = express.Router();

const mail = require('../controllers/mail');

router.get('/sendmail', async (req, res, next) => {
    try {
        console.log("...sendmail----")

        const result = await mail.SEND_MAIL();
        console.log("...", result)
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        console.log(__line, error);
        res.json({ result: false, message:(error.message | error), data: result });
        // next(error);
    }
});
module.exports = router;