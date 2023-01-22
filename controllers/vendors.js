const Vendors = require('../models/vendors')

const getVendors = async (id) => {
    return await Vendors.getVendors(id);
}

const addVendors = async (body) => {
    try {
        const p = {
            name: body.name,
            last_name: body.lastName,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address1: body.address1,
            address2: body.address2,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            is_active: body.is_active ? 1 : 0,
        }
        // const vendors = new Vendors.addVendors(body);
        const result = await Vendors.addVendors(p);
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
            is_active: body.is_active,
        }

        console.log("update resultssss", params)

        const result = await Vendors.updateVendors(id, params);

        // console.log("update result", result);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getVendors, addVendors, updateVendor }