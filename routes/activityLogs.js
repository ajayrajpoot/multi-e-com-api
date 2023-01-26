const express = require('express');
const router = express.Router();

const ActivityLogs = require('../controllers/activity_logs.js');

router.get('/getacivitylogs', async (req, res, next) => {
    try {
        // console.log('req.query', req.query)

        const result = await ActivityLogs.getActivityLogs(req.query);
        // console.log('result', result)
        res.json({ data: result, message: "get Activity " });
    } catch (error) {
        console.error("Error", error.message || error)
        next(error);
    }
});

module.exports = router;