const express = require('express');
const router = express.Router();

const Cart = require('../controllers/cart.js');

router.use('/getcart', async (req, res, next) => {
    try {
        const result = await Cart.getCart(req.query.buyerId);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addcart', async (req, res, next) => {
    try {
        const result = await Cart.addCart(req.body);
        res.json({ result: result._id ? true : false, message: "Add new Vendor ", id: result._id });
    } catch (error) {
        console.log('error', error.message || error)
        next(error);
    }
});


router.post('/updatecart/:id', async (req, res, next) => {
    try {
        const result = await Cart.updateCart(req.body, req.params.id);

        res.json({ result: result.acknowledged, message: "cart update success" });
    } catch (error) {
        console.log('error', error.message || error)
        next(error);
    }
});


router.delete('/deletecart/:id', async (req, res, next) => {
    try {
        const result = await Cart.deleteCart(req.params.id);

        res.json({ result: result.acknowledged, message: "delete cart success" });

    } catch (error) {
        next(error);
    }
});



module.exports = router;