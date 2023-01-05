const Vendors_shop = require('../models/vendors_shop')

const getVendorshop = async (parse) => {
    let query = {};
    if (parse) {
        let query = {};
        if (parse.vendorId)
            query.vendorId = parse.vendorId;

        return await Vendors_shop.find(query);
    }
    else
        return await Vendors_shop.find();
}

const addVendorshop = async (body) => {
    try {
        let p = body;

        let params = {
            vendorId: p.vendorId,
            name: p.name,
            title: p.title,
            email: p.email,
            phone: p.phone,
            password: p.password,
            address1: p.address1,
            address2: p.address2,
            city: p.city,
            state: p.state,
            country: p.country,
            zip: p.zip,
            active: p.active,
        }

        const vendors_shop = new Vendors_shop(params);
        const result = await vendors_shop.save();

        console.log("Result", result)
        return result;
    } catch (error) {
        console.log("Error", error)

        throw error;
    }
}

const updateVendorshop = async (id, body) => {
    try {
        let p = JSON.parse(JSON.stringify(body));
        // delete params._id;

        let params = {
            vendorId: p.vendorId,
            name: p.name,
            title: p.title,
            email: p.email,
            phone: p.phone,
            password: p.password,
            address1: p.address1,
            address2: p.address2,
            city: p.city,
            state: p.state,
            country: p.country,
            zip: p.zip,
            active: p.active,
        }

        const result = await Vendors_shop.update({ "_id": id }, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        console.error("Error", error)
        throw error;
    }
}

module.exports = { getVendorshop, addVendorshop, updateVendorshop }