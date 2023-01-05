const express = require('express');
const router = express.Router();

const Product = require('../controllers/product.js');
const multer = require('multer');
const os = require('os');
const path = require('path');
const fs = require('fs');

const multerStorage = multer.diskStorage({
    destination: os.tmpdir() + "/uplodaFile/seller-files",
    filename: function (req, file, cb) {
        let name = Date.now() + "-" + file.originalname
        cb(null, name)
    }
});

const uploadFile = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            req.file_error = "Only png,jpg or jpeg files allowed";
            return cb(null, false);
        }
        cb(null, true);

    },
}).fields([{ name: "iconImage", maxCount: 1 }]);

router.use('/getproduct', async (req, res, next) => {
    try {
        console.log("req.query", req.query);
        console.log("req.query", req.query);

        const result = await Product.getproduct( req.query);
        res.json({ result: true, message: "", data: result });
        // console.log("result:", result);
    } catch (error) {
        console.log("req.error", error);
        next(error);
    }
});

router.post('/addproduct', uploadFile, async (req, res, next) => {
    try {
        
        let ffileName = '';
        
        if (req.files['iconImage'][0]?.originalname) {

            const extName = path.extname(req.files['iconImage'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['iconImage'][0].originalname).name;

            ffileName = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${ffileName}`;

            const contentType = req.files['iconImage'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['iconImage'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }
        
        if(ffileName)
            req.body.iconImage = ffileName;


        const result = await Product.addproduct(req.body);
        res.json({ result: result._id ? true : false, message: "Add new Vendor ", id: result._id });
    } catch (error) {
        next(error);
    }
});

router.post('/updateproduct/:id', uploadFile, async (req, res, next) => {
    try {
        let ffileName = '';
        
        if (req.files['iconImage'][0]?.originalname) {

            const extName = path.extname(req.files['iconImage'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['iconImage'][0].originalname).name;

            ffileName = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${ffileName}`;

            const contentType = req.files['iconImage'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['iconImage'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }
        
        if(ffileName)
            req.body.iconImage = ffileName;

        const result = await Product.updateproduct(req.body, req.params.id);

        console.log("result", result)
        res.json({ result: result.acknowledged, message: "vendor id update success" });
        console.log("result:", result);
    } catch (error) {
        console.log("error", error.message || error);
        next(error);
    }
});

router.delete('/deleteproduct/:id', async (req, res, next) => {
    try {

        const result = await Product.deleteproduct({ id: req.params.id });

        console.log("result", result)
        res.json({ result: result.acknowledged, message: "delete product success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;