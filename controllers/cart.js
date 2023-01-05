const Cart = require('../models/cart')

const getCart = async (buyerId) => {
    if (buyerId) {
        return await Cart.find({ buyerId: buyerId });
    }
    else
        return await Cart.find();
}

const addCart = async (body) => {
    try {
        let parms = {
            productId: body.productId,
            product_item_id: body.product_item_id,
            quantity: body.quantity,
            buyerId: body.buyerId,
            buyerAddresssId: body.buyerAddresssId,
            shopId: body.shopId,
            color: body.color,
            size: body.size, 
        }
        const cart = new Cart(parms);
        const result = await cart.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateCart = async (body, id) => {
    try {
        
        let parms = {
            productId: body.productId,
            product_item_id: body.product_item_id,
            quantity: body.quantity,
            buyerId: body.buyerId,
            buyerAddresssId: body.buyerAddresssId,
            shopId: body.shopId,
            color: body.color,
            size: body.size, 
        }
        const result = await Cart.update({ _id: id }, parms);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}


const deleteCart = async ( id) => {
    try {
        const result = await Cart.deleteOne({ _id: id });
        console.log("delete result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getCart, addCart, updateCart, deleteCart }