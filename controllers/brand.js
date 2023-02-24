const Brand = require('../models/brand')

const getBrand = async (filter) => {
    return await Brand.getBrand(filter);
}

const addBrand = async (body) => {
    try {
        let params = {

            // icon_image: body.icon_image,
            name: body.name,
            is_active: body.is_active ? true : false,
        }
        if (body.icon_image) {
            params.icon_image = body.icon_image
        }
        const result = await Brand.addBrand(params);
        // const result = await Brand.save();

        console.log("result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

const updateBrand = async (id, body) => {
    try {

        let params = {
            name: body.name,
            is_active: body.is_active ? true : false,
        }

        if (body.icon_image) {
            params.icon_image = body.icon_image
        }
        const result = await Brand.updateBrand(id, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getBrand, addBrand, updateBrand }