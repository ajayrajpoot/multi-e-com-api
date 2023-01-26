const Buyer = require('../models/buyer')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getBuyer = async (buyer_id) => {
    console.log(">>>>")
    return await Buyer.getBuyer(buyer_id);
}

const signup = async (body) => {
    try {
        
        let par = {
            name: body.name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address1: body.address1,
            address2: body.address2,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active ? 1 : 0,
        }
        const result = await Buyer.addBuyer(par);
        // const result = await buyer.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const addBuyer = async (body) => {
    try {
        
        let par = {
            name: body.name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address1: body.address1,
            address2: body.address2,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active ? 1 : 0,
        }
        const result = await Buyer.addBuyer(par);
        // const result = await buyer.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateBuyer = async (body, id) => {
    try {
        let par = {
            name: body.name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address1: body.address1,
            address2: body.address2,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active ? 1 : 0,
        }
        const result = await Buyer.updateBuyer(id, par);
        console.log("update result", body, result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getBuyer, addBuyer, signup, updateBuyer }