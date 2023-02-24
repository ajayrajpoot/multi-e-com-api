const ProductItem = require('../models/productItem')

const getproductItem = async (filter) => {
    return await ProductItem.getProductItem(filter);
}
const getProductItemWithProductDetail = async (query) => {
    console.log("query--->", query)
    let index = ((query.page - 1) * query.offset) || 0;
    let offset = query.offset || 15;
    let next = query.next || false;
    let previous = query.previous || false;
    let data = await ProductItem.getProductItemWithProductDetail(index, offset + 1, query);

    if (data.length > offset) {
        data.pop();
        this.next = true;
    } else {
        this.next = false;
    }

    let ren = {
        data:data,
        next : next, 
        previous : previous, 
    }

    return ren;
}

const addproductItem = async (body) => {
    try {
        console.log("body---------->", body)

        let params = {
            product_id: body.product_id,
            sku: body.sku,
            size: body.size,
            color: body.color,
            stock: body.stock,
            price: body.price,

            discount: body.discount,
            tax: body.tax,
            offer: body.offer,
            description: body.description
        }

        if (body.productImage1) { params.image1 = body.productImage1; }
        if (body.productImage2) { params.image2 = body.productImage2; }
        if (body.productImage3) { params.image3 = body.productImage3; }
        if (body.productImage4) { params.image4 = body.productImage4; }

        const result = await ProductItem.addProductItem(params);
        // const result = await productItem.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateproductItem = async (id, body) => {
    try {

        let params = {
            product_id: body.product_id,
            sku: body.sku,
            size: body.size,
            color: body.color,
            stock: body.stock,
            price: body.price,

            discount: body.discount,
            tax: body.tax,
            offer: body.offer,
            description: body.description,
        }
        if (body.productImage1) { params.image1 = body.productImage1; }
        if (body.productImage2) { params.image2 = body.productImage2; }
        if (body.productImage3) { params.image3 = body.productImage3; }
        if (body.productImage4) { params.image4 = body.productImage4; }

        console.log('params', params)

        const result = await ProductItem.updateProductItem(id, params);

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

module.exports = { getproductItem, getProductItemWithProductDetail, addproductItem, updateproductItem, deleteproductItem }