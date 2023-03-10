const express = require('express');
const router = express.Router();

const Category = require('../controllers/productCategory.js');

const os = require('os');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: os.tmpdir() + "/uplodaFile/seller-files",
    filename: function (req, file, cb) {
        let name = Date.now() + "-" + file.originalname
        cb(null, name)
    }
})

const uploadFile = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            req.file_error = "Only png,jpg or jpeg files allowed";
            return cb(null, false);
        }
        cb(null, true);

    },
}).fields([{ name: "iconImage", maxCount: 1 }])


router.get('/getCategory', async (req, res, next) => {
    try {
        const result = await Category.getCategory(req.query);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addCategory', uploadFile, async (req, res, next) => {
    try {
        if (req.files && req.files['iconImage'] && req.files['iconImage'][0]) {

            console.log("body", req.body)
            const extName = path.extname(req.files['iconImage'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['iconImage'][0].originalname).name;

            let ffileName = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${ffileName}`;

            const contentType = req.files['iconImage'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['iconImage'][0].path);
            let d = fs.writeFileSync(lPath, fileContent);

            req.body.icon_image = ffileName;
        }
        const result = await Category.addCategory(req.body);
        res.json({ result: result.insertId ? true : false, message: "Add new Vendor ", id: result.insertId });
    } catch (error) {
        next(error);
    }
});


router.post('/updateCategory/:id', uploadFile, async (req, res, next) => {
    try {
        console.log("body", req.body)

        if (req.files && req.files['iconImage']) {

            const extName = path.extname(req.files['iconImage'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['iconImage'][0].originalname).name;

            let ffileName = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${ffileName}`;

            const contentType = req.files['iconImage'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['iconImage'][0].path);
            // S3ClassObj.s3Upload(s3path, fileContent, contentType);   
            let d = fs.writeFileSync(lPath, fileContent);

            req.body.icon_image = ffileName;
        }

        const result = await Category.updateCategory(req.params.id, req.body);

        console.log("result--->", result);

        res.json({ result: result.affectedRows ? true : false, message: "type id update success" });
    } catch (error) {
        console.log("error--->", error);
        next(error);
    }
});

module.exports = router;