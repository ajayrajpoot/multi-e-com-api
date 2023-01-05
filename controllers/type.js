const Type = require('../models/type')

const getType = async (query) => {
    if (query) {
        let params = {};

        if (params.typeId)
            params._id = query.typeId;

        if (params.shopId)
            params.shopId = query.shopId;

        return await Type.find(params);
    }
    else {
        return await Type.find();
    }
}

const addType = async (body) => {
    try {
        let par = {
            iconImage: body.iconImage,
            name: body.name,
            shopId: body.shopId,
            active: body.active,
        }
        console.log("par:-------------->", par)

        const type = new Type(par);
        const result = await type.save();
        console.log("update result", result)
        return result;
    } catch (error) {
        console.log("update error", error.message)
        throw error;
    }
}

const updateType = async (id, body) => {
    try {
        const params = JSON.parse(JSON.stringify(body));
        delete params._id;
        const result = await Type.update({ _id: id }, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getType, addType, updateType }