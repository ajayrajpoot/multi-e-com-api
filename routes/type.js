const express = require('express');
const router = express.Router();

const Type = require('../controllers/type.js');
const files = require('../module/files');
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

router.use('/gettype', async (req, res, next) => {
    try {
        const result = await Type.getType(req.query);
        res.json({ result: true, message: "", data: result });
    } catch (error) {
        next(error);
    }
});

// router.post('/addtype', uploadFile.single('iconImage'), async (req, res, next) => {
router.post('/addType', uploadFile, async (req, res, next) => {
    try {
        console.log("req.files['iconImage']", req.files['iconImage'])

        if (req.files['iconImage'] ) {

            console.log('body:', req.body)
            console.log('file>', req.files)


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
        const result = Type.addType(req.body);
        res.json({ result:  result.modifiedCount ? true : false, message: "Add new Product Type ", id: result._id });
        // });

    } catch (error) {
        console.log('======' ,error.message || error)

        next(error);
    }
});


router.post('/updatetype/:id' , uploadFile, async (req, res, next) => {
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
        const result = await Type.updateType(req.params.id ,req.body);

        console.log("result", result)
        res.json({ result:  result.modifiedCount ? true : false, message: " update Product Type success" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;