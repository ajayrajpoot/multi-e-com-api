const Type = require('../models/productType')

const getType = async (query) => {
    return await Type.getProductTypes(query.id, query.shop_id);
}

const addType = async (body) => {
    try {
        let par = {
            icon_image: body.icon_image,
            name: body.name,
            shop_id: body.shop_id,
            is_active: body.is_active ? 1:0,
        }
        console.log("par:-------------->", par)

        const result = await Type.addProductTypes(par);
        console.log("update result", result)
        return result;
    } catch (error) {
        console.log("update error", error.message)
        throw error;
    }
}

const updateType = async (id, body) => {
    try {
        let par = {
            icon_image: body.icon_image,
            name: body.name,
            shop_id: body.shop_id,
            is_active: body.is_active ? 1 : 0,
        }
        const result = await Type.updateProductTypes(id, par);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getType, addType, updateType }