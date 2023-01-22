const express = require('express');
const router = express.Router();

const Cart = require('../controllers/cart.js');

router.use('/getcart', async (req, res, next) => {
    try {
        const result = await Cart.getCart(req.query.buyer_id);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addcart', async (req, res, next) => {
    try {
        const result = await Cart.addCart(req.body);

        console.log("result", result)
        res.json({ result: result.insertId ? true : false, message: "Add new Vendor ", id: result.insertId });
    } catch (error) {
        console.log('error', error.message || error)
        next(error);
    }
});


router.post('/updatecart/:id', async (req, res, next) => {
    try {
        const result = await Cart.updateCart(req.body, req.params.id);

        res.json({ result: result.affectedRows ? true : false, message: "cart update success" });
    } catch (error) {
        console.log('error', error.message || error)
        next(error);
    }
});


router.delete('/deletecart/:id', async (req, res, next) => {
    try {
        const result = await Cart.deleteCart(req.params.id);

        res.json({ result: result.affectedRows ? true : false, message: "delete cart success" });

    } catch (error) {
        next(error);
    }
});



module.exports = router;