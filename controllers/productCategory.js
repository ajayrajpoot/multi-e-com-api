const Category = require('../models/productCategory')

const getCategory = async (filter) => {
    return await Category.getProductCategory(filter);
}

const addCategory = async (body) => {
    try {
        let params = {

            // icon_image: body.icon_image,
            name: body.name,
            type_id: body.type_id,
            shop_id: body.shop_id,
            is_active: body.is_active ? true : false,
        }
        if (body.icon_image) {
            params.icon_image = body.icon_image
        }
        const result = await Category.addProductCategory(params);
        // const result = await Category.save();

        console.log("result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

const updateCategory = async (id, body) => {
    try {

        let params = {
            // icon_image: body.icon_image,
            name: body.name,
            // type_id: body.type_id,
            // shop_id: body.shop_id,
            is_active: body.is_active ? true : false,
        }
        
        if (body.icon_image) {
            params.icon_image = body.icon_image
        }
        const result = await Category.updateProductCategory(id, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getCategory, addCategory, updateCategory }