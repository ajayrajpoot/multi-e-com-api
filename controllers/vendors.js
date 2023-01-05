const Vendors = require('../models/vendors')

const getVendors = async (id) => {
    if (id) {
        // return Vendors.find({ _id: id }).select("_id").lean();
        return await Vendors.find({ _id: id });
    }
    else
        return await Vendors.find();
}

const addVendors = async (body) => {
    try {
        const p = {
            name: body.name,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address1: body.address1,
            address2: body.address2,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active,
        }
        const vendors = new Vendors(body);
        const result = await vendors.save();
        console.log("result", result)
        return result;
    } catch (error) {
        console.log("Error:", error)

        throw error;
    }
}

const updateVendor = async (id, body) => {
    try {
        const params = {
            name: body.name,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address1: body.address1,
            address2: body.address2,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active,
        }

        console.log("update resultssss", params)

        const result = await Vendors.update({ "_id": id }, params);

        // console.log("update result", result);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getVendors, addVendors, updateVendor }