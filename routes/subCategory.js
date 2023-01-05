const express = require('express');
const router = express.Router();

const subCategory = require('../controllers/subcategory');


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


router.use('/getsubcategory', async (req, res, next) => {
    try {
        const result = await subCategory.getSubCategory(req.query);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/addsubcategory', uploadFile, async (req, res, next) => {
    try {
        if (req.files) {


            const extName = path.extname(req.files['iconImage'][0].originalname).toLowerCase();
            let fileName = path.parse(req.files['iconImage'][0].originalname).name;

            let ffileName = fileName + '_' + (+new Date()) + extName;
            let lPath = `./public/upload/${ffileName}`;

            const contentType = req.files['iconImage'][0].mimetype;
            const fileContent = fs.readFileSync(req.files['iconImage'][0].path);
            // S3ClassObj.s3Upload(s3path, fileContent, contentType);   
            let d = fs.writeFileSync(lPath, fileContent);

            req.body.iconImage = ffileName;
        }
        const result = await subCategory.addSubCategory(req.body);
        console.log('result', result)
        res.json({ result: result._id ? true : false, message: "Add Sub Category ", id: result._id });
    } catch (error) {
        console.log('error', error)
        next(error);
    }
});


router.post('/updatesubcategory/:id', uploadFile, async (req, res, next) => {
    try {
        console.log("req.files", req.files);
        let ffileName = '';
        try {

            if (req.files['iconImage'][0]?.originalname) {
                const extName = path.extname(req.files['iconImage'][0].originalname).toLowerCase();
                let fileName = path.parse(req.files['iconImage'][0].originalname).name;

                let ffileName = fileName + '_' + (+new Date()) + extName;
                let lPath = `./public/upload/${ffileName}`;

                const contentType = req.files['iconImage'][0].mimetype;
                const fileContent = fs.readFileSync(req.files['iconImage'][0].path);
                // S3ClassObj.s3Upload(s3path, fileContent, contentType);   
                let d = fs.writeFileSync(lPath, fileContent);

                // req.body.iconImage = ffileName;
            }

            if (ffileName) {
                req.body.iconImage = ffileName;
            }
        } catch (error) {
            console.error("error", error.message || error);
        }
        console.log("req.params.id, req.body", req.params.id, req.body)
        const result = await subCategory.updateSubCategory(req.params.id, req.body);

        res.json({ result: result.modifiedCount ? true : false, message: "subCategory id update success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;