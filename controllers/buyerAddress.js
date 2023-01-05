const BuyerAddress = require('../models/buyerAddress')

const getBuyerAddress = async (typeId) => {
    if (typeId) {
        return await BuyerAddress.find();
    }
    else
        return await BuyerAddress.find();
}

const addBuyerAddress = async (body) => {
    try {
        const buyer = new BuyerAddress(body);
        const result = await buyer.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateBuyerAddress = async (body, id) => {
    try {
        const result = await BuyerAddress.update({ _id: id }, body);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteBuyerAddress = async (id) => {
    try {
        const result = await BuyerAddress.deleteOne({ _id: id });
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getBuyerAddress, addBuyerAddress, updateBuyerAddress, deleteBuyerAddress }