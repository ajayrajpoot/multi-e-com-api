const SubCategory = require('../models/subcategory')

const getSubCategory = async (body ) => {

    console.log("categoryId", body.categoryId)
    if (body.categoryId) {
        return await SubCategory.find({ categoryId: body.categoryId });
    }
    else
        return await SubCategory.find();
}

const addSubCategory = async (body) => {
    try {

        let params = {
            // iconImage: body.iconImage,
            name: body.name,
            typeId: body.typeId,
            categoryId: body.categoryId,
            shopId: body.shopId,
            active: body.active ? true : false,
        }
        
        if(body.iconImage){
            params.iconImage = body.iconImage;
        }
        const subCategory = new SubCategory(params);
        const result = await subCategory.save();
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
        if(body.iconImage){
            params.iconImage = body.iconImage;
        }

        console.log("params", params)
        const result = await SubCategory.update({ _id: id }, params);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getSubCategory, addSubCategory, updateSubCategory }