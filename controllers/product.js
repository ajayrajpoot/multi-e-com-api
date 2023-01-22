const Product = require('../models/product')

const getproduct = async (fillter) => {
    // return await Product.find({ _id: productId });

    console.log("fillter", fillter)

    let condition = {};
    let condition1 = {};

    if (fillter?.shop_id) { condition.shop_id = fillter.shop_id; }
    if (fillter?.sponsored) { condition.sponsored = true; }
    if (fillter?.category_id) { condition.category_id = fillter.category_id; }
    if (fillter?.sunCategory_id) { condition.sunCategory_id = fillter.sunCategory_id; }

    console.log("condition", condition)

    let res = await Product.getProduct(fillter)
    console.log("res", res);
    return res;
}

const productDetailById = async (productId) => {
    // return await Product.find({ _id: productId });

    console.log("fillter", fillter)

    let condition = {};

    console.log("condition", condition)

    let res = await Product.aggregate([
        { $match: { _id: productId } },

        {
            $lookup: {
                from: "productitems",
                foreignField: "productId",
                localField: "_id",
                as: "orderItem"
            }
        },
    ]);
    console.log("res", res);
    return res;
}

const addproduct = async (body) => {
    try {
        console.log("body..", body)
        let params = {
            title: body.title,
            discription: body.discription,
            // iconImage:body.iconImage,
            shop_id: body.shop_id,
            type_id: body.type_id,
            category_id: body.category_id,
            sub_category_id: body.sub_category_id,
            // bought:body.bought,
            shipping: body.shipping,
            // rating:body.rating,
            // ratingCount:body.ratingCount,
            buyer_guarantee: body.buyer_guarantee,
            sponsored: body.sponsored,
            // likes:body.likes,
            // dislikes:body.dislikes,
            active: body.active ? true : false,
        }

        if (body.icon_image)
            params.icon_image = body.icon_image;

        const result = await Product.addProduct(params);
        // const result = await product.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateproduct = async (body, id) => {
    try {
        console.log(">>>>", body, id)
        let params = {
            title: body.title,
            discription: body.discription,
            // iconImage:body.iconImage,
            // shopId:body.shopId,
            // typeId:body.typeId,
            // categoryId:body.categoryId,
            // sunCategoryId:body.sunCategoryId,
            // bought:body.bought,
            shipping: body.shipping,
            // rating:body.rating,
            // ratingCount:body.ratingCount,
            buyer_guarantee: body.buyer_guarantee,
            sponsored: body.sponsored,
            // likes:body.likes,
            // dislikes:body.dislikes,
            active: body.active ? true : false,
        }
        if (body.icon_image)
            params.icon_image = body.icon_image;
        // const params = JSON.parse(JSON.stringify(body));
        const result = await Product.updateProduct( id , params);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}


const deleteproduct = async (id) => {
    try {
        const result = await Product.deleteProduct(id);

        console.log("delete result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getproduct, productDetailById, addproduct, updateproduct, deleteproduct }