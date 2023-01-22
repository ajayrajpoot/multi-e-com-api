const Vendors_shop = require('../models/vendors_shop')

const getVendorShops = async (vendor_id) => { 

        return await Vendors_shop.getVendorShops(vendor_id); 
}

const addVendorShops = async (body) => {
    try {
        let p = body;

        let params = {
            vendor_id: p.vendor_id,
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
            is_active: p.is_active,
        }

        const result = await Vendors_shop.addVendorShops(params);
        // const result = await vendors_shop.save();

        console.log("Result", result)
        return result;
    } catch (error) {
        console.log("Error", error)

        throw error;
    }
}

const updateVendorShops = async (id, body) => {
    try {
        let p = JSON.parse(JSON.stringify(body));
        // delete params._id;

        let params = {
            vendor_id: p.vendor_id,
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
            is_active: p.is_active,
        }

        const result = await Vendors_shop.updateVendorShops(id, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        console.error("Error", error)
        throw error;
    }
}

module.exports = { getVendorShops, addVendorShops, updateVendorShops }