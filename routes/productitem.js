const express = require('express');
const router = express.Router();

const ProductItem = require('../controllers/productitem.js');

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
}).fields([
    { name: "productImage1", maxCount: 1 },
    { name: "productImage2", maxCount: 1 },
    { name: "productImage3", maxCount: 1 },
    { name: "productImage4", maxCount: 1 }]);

router.use('/getproductItem', async (req, res, next) => {
    try {
        const result = await ProductItem.getproductItem(req.query.id);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addproductItem', uploadFile, async (req, res, next) => {
    try {

        console.log("req------------>", req.files)
        console.log("productImage1:", req.files['productImage1'])
        console.log("productImage2:", req.files['productImage2'][0]?.originalname)
        console.log("productImage3:", req.files['productImage3'][0]?.originalname)
        console.log("productImage4:", req.files['productImage4'][0]?.originalname)
        

        let productImage1 = '';
        let productImage2 = '';
        let productImage3 = '';
        let productImage4 = '';

        if (req.files['productImage1'][0]?.originalname) {

            const extName = path.extname(req.files['productImage1'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['productImage1'][0].originalname).name;

            let productImage1 = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${productImage1}`;

            const contentType = req.files['productImage1'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage1'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }
        //product 2

        if (req.files['productImage2'][0]?.originalname) {

            const extName = path.extname(req.files['productImage2'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['productImage2'][0].originalname).name;

            let productImage2 = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${productImage2}`;

            const contentType = req.files['productImage2'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage2'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }

        if (req.files['productImage3'][0]?.originalname) {

            const extName = path.extname(req.files['productImage3'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['productImage3'][0].originalname).name;

            let productImage3 = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${productImage3}`;

            const contentType = req.files['productImage3'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage3'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }

        if (req.files['productImage4'][0]?.originalname) {

            const extName = path.extname(req.files['productImage4'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['productImage4'][0].originalname).name;

            let productImage4 = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${productImage4}`;

            const contentType = req.files['productImage4'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage4'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);
        }

        if (productImage1)
            req.body.productImage1 =  (productImage1);

        if (productImage2)
            req.body.productImage2 =  (productImage2);

        if (productImage3)
            req.body.productImage3 =  (productImage3);

        if (productImage4)
            req.body.productImage4 =  (productImage4);


        const result = await ProductItem.addproductItem(req.body);

        res.json({ result: result._id ? true : false, message: "Add new Vendor ", id: result._id });

    } catch (error) {
        console.log("error", error)

        next(error);
    }
});

router.post('/updateproductItem/:id', uploadFile, async (req, res, next) => {
    try {

        
        console.log("req------------>", req.files)
        console.log("productImage1:", req.files['productImage1'])
        console.log("productImage2:", req.files['productImage2'] )
        console.log("productImage3:", req.files['productImage3'] )
        console.log("productImage4:", req.files['productImage4'])
        

        let productImage1 = '';
        let productImage2 = '';
        let productImage3 = '';
        let productImage4 = '';

        if (req.files['productImage1']) {

            const extName = path.extname(req.files['productImage1'][0].originalname).toLowerCase();
            console.log(extName)
            let fileName = path.parse(req.files['productImage1'][0].originalname).name;
            console.log(fileName)

            productImage1 = fileName + '_' + (+new Date()) + extName;
            console.log('---->',productImage1)
            let lPath = `./public/upload/${productImage1}`;
            console.log(lPath)

            const contentType = req.files['productImage1'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage1'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }
        //product 2

        if (req.files['productImage2']) {

            const extName = path.extname(req.files['productImage2'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['productImage2'][0].originalname).name;

            productImage2 = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${productImage2}`;

            const contentType = req.files['productImage2'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage2'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }

        if (req.files['productImage3']) {

            const extName = path.extname(req.files['productImage3'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['productImage3'][0].originalname).name;

            productImage3 = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${productImage3}`;

            const contentType = req.files['productImage3'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage3'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

        }

        if (req.files['productImage4']) {

            const extName = path.extname(req.files['productImage4'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['productImage4'][0].originalname).name;

            productImage4 = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${productImage4}`;

            const contentType = req.files['productImage4'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['productImage4'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);
        }

        if (productImage1)
            req.body.productImage1 =  (productImage1);

        if (productImage2)
            req.body.productImage2 =  (productImage2);

        if (productImage3)
            req.body.productImage3 =  (productImage3);

        if (productImage4)
            req.body.productImage4 =  (productImage4);

 

        console.log("req.params.id, req.body", req.params.id, req.body)
        const result = await ProductItem.updateproductItem(req.params.id, req.body);

        console.log("result", result)
        res.json({ result: result.acknowledged, message: "Update Product Item success" });
    } catch (error) {
        console.log("error", error)
        next(error);
    }
});


router.delete('/deleteproductItem/:id', uploadFile, async (req, res, next) => {
    try {
        const result = await ProductItem.deleteproductItem(req.params.id);

        console.log("result", result)
        res.json({ result: result.acknowledged, message: "delete product item success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;