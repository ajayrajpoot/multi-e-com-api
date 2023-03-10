const OrderItems = require('../models/orderItem')

const getOrderItems = async (params) => {
    return await OrderItems.getOrderItem(params);
}

const addOrderItems = async (body) => {
    try {
        const result = new OrderItems.addOrderItem(body);
        // const result = await category.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateOrderItems = async (body) => {
    try {
        const params = JSON.parse(JSON.stringify(body));
        delete params._id;
        const result = await OrderItems.updateOrderItem(params, body._id);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}


const deleteOrderItems = async (id) => {
    try {
        const result = await OrderItems.deleteOne({ _id: id });

        console.log("delete result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getOrderItems, addOrderItems, updateOrderItems, deleteOrderItems }