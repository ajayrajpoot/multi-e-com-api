const fs = require('fs');


// const deleteFile = util.promisify(fs.unlink);
const uploadItemFile = async (path, data, option = null) => {
    try {
        const fileContent =  fs.writeFileSync(path, data, option); 

        return fileContent;

    } catch (error) {
        throw new Error(error.message || error);
    }
}

module.exports = {
    uploadItemFile
}
// const uploadItemFile1 = async (sellerId, files, type) => {
//     try {

//         const timestemp = +new Date()
//         const S3ClassObj = new S3Class();

//         const extName = path.extname(files['itemFile'][0].originalname).toLowerCase();
//         let fileName = path.parse(files['itemFile'][0].originalname).name;

//         fileName = fileName + '_' + timestemp + extName;

//         let s3path = '';
//         if (['dg_doc', 'msds_doc'].includes(type)) {
//             s3path = `sellers/${sellerId}/sku_docs/${fileName}`;
//         } else if (['invoice_filename', 'item_filename', 'pacakge_filename'].includes(type)) {
//             s3path = `sellers/${sellerId}/items_file/${fileName}`;
//         } else {
//             throw 'invalid type key';
//         }

//         const contentType = files['itemFile'][0].mimetype;
//         const fileContent = fs.readFileSync(files['itemFile'][0].path); 
//         S3ClassObj.s3Upload(s3path, fileContent, contentType);

//         return fileName;

//     } catch (error) {
//         throw new Error(error.message || error);
//     }
// }

// const getItemFilePath = async (sellerId, fileName, type) => {
//     try {

//         const S3ClassObj = new S3Class();
//         let s3path = '';

//         if (['dg_doc', 'msds_doc'].includes(type)) {
//             s3path = `sellers/${sellerId}/sku_docs/${fileName}`;
//         } else if (['invoice_filename', 'item_filename', 'pacakge_filename'].includes(type)) {
//             s3path = `sellers/${sellerId}/items_file/${fileName}`;
//         } else {
//             throw 'invalid type key';
//         }
//         const s3Path = await S3ClassObj.getFilePath(s3path);

//         return s3Path;

//     } catch (error) {
//         throw new Error(error.message || error);
//     }
// }
