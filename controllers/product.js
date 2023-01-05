const Product = require('../models/product')

const getproduct = async (fillter) => {
    // return await Product.find({ _id: productId });

    console.log("fillter", fillter)

    let condition = {};
    let condition1 = {};

    if (fillter?.shopId) { condition.shopId = fillter.shopId; }
    if (fillter?.sponsored) { condition.sponsored = true; }
    if (fillter?.categoryId) { condition.categoryId = fillter.categoryId; }
    if (fillter?.sunCategoryId) { condition.sunCategoryId = fillter.sunCategoryId; }

    // if (fillter?.search) { condition1.productitems.$.description = { $regex: search, $options: "i" }; }

 
    console.log("condition", condition)

    // let res = Product.find({shopId : fillter.shopId})
    // let res = Product.find( )


     let res = await Product.aggregate([
    //     { $match: condition },

        {
            $lookup: {
                from: "productitems",
                foreignField: "productId",
                localField: "_id",
                as: "orderItem"
            }
        },

    //     // { $match: condition },

    //     // {
    //     //     $lookup: {
    //     //         from: "categories",
    //     //         foreignField: "_id",
    //     //         localField: "categoryId",
    //     //         as: "category"
    //     //     }
    //     // },
    //     // {
    //     //     $lookup: {
    //     //         from: "types",
    //     //         foreignField: "_id",
    //     //         localField: "typeId",
    //     //         as: "type"
    //     //     }
    //     // },
    //     // {
    //     //     $project: {
    //     //         _id: 0, buyerGuarantee: 0, create: 0,
    //     //         "category._id": 0, "category.active": 0, "category.create": 0, "category.__v": 0,
    //     //         "type._id": 0, "type.active": 0, "type.create": 0, "type.__v": 0
    //     //     }
    //     // }
    ]);
    console.log("res", res);
    return res ;
}

const addproduct = async (body) => {
    try {
        console.log("body..", body)
        let params = {
            title:body.title,
            discription:body.discription,
            // iconImage:body.iconImage,
            shopId:body.shopId,
            typeId:body.typeId,
            categoryId:body.categoryId,
            sunCategoryId:body.sunCategoryId,
            // bought:body.bought,
            shipping:body.shipping,
            // rating:body.rating,
            // ratingCount:body.ratingCount,
            buyerGuarantee:body.buyerGuarantee,
            // sponsored:body.sponsored,
            // likes:body.likes,
            // dislikes:body.dislikes,
            active:body.active?true:false,
        }
        
        if(body.iconImage)
            params.iconImage=body.iconImage;

        const product = new Product(params);
        const result = await product.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateproduct = async (body, id) => {
    try {
        console.log(">>>>", body, id)
        let params = {
            title:body.title,
            discription:body.discription,
            // iconImage:body.iconImage,
            // shopId:body.shopId,
            // typeId:body.typeId,
            // categoryId:body.categoryId,
            // sunCategoryId:body.sunCategoryId,
            // bought:body.bought,
            shipping:body.shipping,
            // rating:body.rating,
            // ratingCount:body.ratingCount,
            buyerGuarantee:body.buyerGuarantee,
            // sponsored:body.sponsored,
            // likes:body.likes,
            // dislikes:body.dislikes,
            active:body.active?true:false,
        }
        if(body.iconImage)
            params.iconImage=body.iconImage;
        // const params = JSON.parse(JSON.stringify(body));
        const result = await Product.update( {_id: id}, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}


const deleteproduct = async (id) => {
    try {
        const result = await Product.deleteOne({ _id: id });

        console.log("delete result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getproduct, addproduct, updateproduct, deleteproduct }