const TrackingEvent = require('../models/tracking_event')

const getTrackingEvent = async (orderId) => {
    return await TrackingEvent.find({ order_id: orderId });
}
const addtrackingEvent = async (body) => {
    try {
        const result = await TrackingEvent.insert(body);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getTrackingEvent, addtrackingEvent }