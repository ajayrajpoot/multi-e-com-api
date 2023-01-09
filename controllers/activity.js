const Activity = require('../models/activity')
const getactivity = async () => {
    return await Activity.find();
}
const addactivity = async (body, id) => {
    try {
        const result = await Activity.insert(body);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = { getactivity ,addactivity }