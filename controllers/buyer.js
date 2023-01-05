const Buyer = require('../models/buyer')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getBuyer = async (typeId) => {
    if (typeId) {
        return await Buyer.find();
    }
    else
        return await Buyer.find();
}

const addBuyer = async (body) => {
    try {
        const buyer = new Buyer(body);
        const result = await buyer.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateBuyer = async (body, id) => {
    try {
        const result = await Buyer.update({ _id: id }, body);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getBuyer, addBuyer, updateBuyer }