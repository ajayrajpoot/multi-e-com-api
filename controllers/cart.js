const Cart = require('../models/cart')

const getCart = async (buyerId) => {
    return await Cart.getCart(buyerId);
}

const addCart = async (body) => {
    try {
        let parms = {
            product_id: body.product_id,
            product_item_id: body.product_item_id,
            quantity: body.quantity,
            buyer_id: body.buyer_id,
            buyer_address_id: body.buyer_address_id,
            shop_id: body.shop_id,
            color: body.color,
            size: body.size,
        }
        const result = await Cart.addCart(parms);
        // const result = await cart.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateCart = async (body, id) => {
    try {

        let parms = {
            product_id: body.product_id,
            product_item_id: body.product_item_id,
            quantity: body.quantity,
            buyer_id: body.buyer_id,
            buyer_address_id: body.buyer_address_id,
            shop_id: body.shop_id,
            color: body.color,
            size: body.size,
        }
        const result = await Cart.updateCart(id, parms);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}


const deleteCart = async (id) => {
    try {
        const result = await Cart.deleteOne({ _id: id });
        console.log("delete result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getCart, addCart, updateCart, deleteCart }