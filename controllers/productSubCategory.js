const SubCategory = require('../models/productSubCategory')

const getSubCategory = async (body) => {

    return await SubCategory.getProductSubCategory(body.category_id);
}

const addSubCategory = async (body) => {
    try {

        let params = {
            icon_image: body.icon_image,
            name: body.name,
            type_id: body.type_id,
            category_id: body.category_id,
            shop_id: body.shop_id,
            active: body.active ? true : false,
        }

        if (body.icon_image) {
            params.icon_image = body.icon_image;
        }
        const result = await SubCategory.addProductSubCategory(params);
        // const result = await subCategory.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateSubCategory = async (id, body) => {
    try {


        let params = {
            // iconImage: body.iconImage,
            name: body.name,
            // typeId: body.typeId,
            // categoryId: body.categoryId,
            // shopId: body.shopId,
            active: body.active ? true : false,
        }
        if (body.icon_image) {
            params.icon_image = body.icon_image;
        }

        console.log("params", params)
        const result = await SubCategory.updateProductSubCategory(id, params);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getSubCategory, addSubCategory, updateSubCategory }