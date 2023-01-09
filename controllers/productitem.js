const ProductItem = require('../models/productItem')

const getproductItem = async (productId) => {
    if (productId) {
        return await ProductItem.find({ productId: productId });
    }
    else
        return await ProductItem.find();
}

const addproductItem = async (body) => {
    try {
        console.log("body---------->", body)

        let params = {
            productId: body.productId,
            sku: body.sku,
            size: body.size,
            color: body.color,
            stock: body.stock,
            price: body.price,
            isPriceIncludingDiscount: body.isPriceIncludingDiscount ? true : false,
            isPriceIncludingTax: body.isPriceIncludingTax ? true : false,
            isDiscount: body.isDiscount,
            discount: body.discount,
            tax: body.tax,
            offer: body.offer,
            description: body.description
        }
        
        if(body.productImage1) { params.productImage1 = body.productImage1; }
        if(body.productImage2) { params.productImage2 = body.productImage2; }
        if(body.productImage3) { params.productImage3 = body.productImage3; }
        if(body.productImage4) { params.productImage4 = body.productImage4; }

        const productItem = new ProductItem(params);
        const result = await productItem.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateproductItem = async (id, body) => {
    try {

        let params = {
            productId: body.productId,
            sku: body.sku,
            size: body.size,
            color: body.color,
            stock: body.stock,
            price: body.price,
            isPriceIncludingDiscount: body.isPriceIncludingDiscount ? true : false,
            isPriceIncludingTax: body.isPriceIncludingTax ? true : false,
            isDiscount: body.isDiscount,
            discount: body.discount,
            tax: body.tax,
            offer: body.offer,
            description: body.description,
        }
        if(body.productImage1) { params.productImage1 = body.productImage1; }
        if(body.productImage2) { params.productImage2 = body.productImage2; }
        if(body.productImage3) { params.productImage3 = body.productImage3; }
        if(body.productImage4) { params.productImage4 = body.productImage4; }

        console.log('params', params)

        const result = await ProductItem.update({ _id: id }, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        throw error;
    }
}


const deleteproductItem = async (id) => {
    try {
        const result = await ProductItem.deleteOne({ _id: id });

        console.log("delete result", result)
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getproductItem, addproductItem, updateproductItem, deleteproductItem }