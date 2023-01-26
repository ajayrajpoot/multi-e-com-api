const BuyerAddress = require('../models/buyerAddress')

const getBuyerAddress = async (buyer_id) => {
    console.log(">>>>", buyer_id)

    return await BuyerAddress.getBuyerAddress(buyer_id);

}

const addBuyerAddress = async (body) => {
    try {
        console.log("body:", body)
        let p = {
            buyer_id: body.buyer_id,
            name: body.name,
            address1: body.address1,
            address2: body.address2,
            landmark: body.landmark,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active ? true : false,
        }
        // const buyer = new BuyerAddress(p);
        const result = await BuyerAddress.addBuyerAddress(p);
        console.log("result--->", result)
        return result;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
}

const updateBuyerAddress = async (body, id) => {
    try {
        console.log("updateBuyerAddress" );

        let p = {
            name: body.name,
            address1: body.address1,
            address2: body.address2,
            landmark: body.landmark,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active ? true : false,
        }
        const result = await BuyerAddress.updateBuyerAddress(id, p);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteBuyerAddress = async (id) => {
    try {
        const result = await BuyerAddress.deleteBuyerAddress(id);
        console.log("update result", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = { getBuyerAddress, addBuyerAddress, updateBuyerAddress, deleteBuyerAddress }