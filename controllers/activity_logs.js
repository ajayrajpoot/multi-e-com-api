const Activity = require('../models/activity_logs')
const getActivityLogs = async (filter) => {
    return await Activity.getActivityLogs(filter);
}
const addActivityLogs = async (body, id) => {
    try {
        let actiObj = {
            note: body.note || null,
            type: body.type || null,
            visibility: body.visibility || null,
            add_by: body.add_by || null,
            order_id: body.order_id || null,
            shop_id: body.shop_id || null,
        }
        const result = await Activity.addActivityLogs(actiObj);
        console.log("update result", result);

        return true;
    } catch (error) {
        console.log("Error", error.message || error)
        return false
    }
}


module.exports = { getActivityLogs, addActivityLogs }