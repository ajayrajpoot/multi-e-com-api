const Category = require('../models/category')

const getCategory = async (typeId) => {
    if (typeId) {
        return await Category.find({ typeId: typeId });
    }
    else
        return await Category.find();
}

const addCategory = async (body) => {
    try {
        let params = {

            iconImage: body.iconImage,
            name: body.name,
            typeId: body.typeId,
            shopId: body.shopId,
            active: body.active ? true : false,
        }
        const category = new Category(params);
        const result = await category.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateCategory = async (id, body) => {
    try {
        console.log(">>>>>>>", body)
        let params = {

            iconImage: body.iconImage,
            name: body.name,
            typeId: body.typeId,
            shopId: body.shopId,
            active: body.active ? true : false,
        }
        const result = await Category.update({ _id: id }, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getCategory, addCategory, updateCategory }