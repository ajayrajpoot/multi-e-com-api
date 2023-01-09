const TrackingData = require('../models/tracking_data')

const getTrackingData = async (awb) => {
    return await TrackingData.find({ awb: awb });
}
const addtracking_data = async (body, id) => {
    try {
        const result = await TrackingData.insert(body);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getTrackingData, addtracking_data }