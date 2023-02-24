const auth = require('./auth');
const vendor = require('./vendors');
const vendors_shop = require('./vendors_shop');
const type = require('./productType');
const category = require('./productCategory');
const subCategory = require('./productSubCategory');
const smtp = require('./smtp');
const product = require('./product');
const productitem = require('./productItem');
const buyer = require('./buyer');
const buyerAddress = require('./buyerAddress');
const cart = require('./cart');
const order = require('./order');
const orderItem = require('./orderItem');
const orderBilling = require('./orderBilling');
const activityLogs = require('./activityLogs');
const mail = require('./mail');
const brand = require('./brand');

module.exports = {
    auth,
    vendor,
    vendors_shop,
    type,
    category,
    subCategory,
    smtp,
    product,
    productitem,
    buyer,
    buyer,
    cart,
    order,
    orderItem,
    orderBilling,
    buyerAddress,
    activityLogs,
    mail,
    brand,



};
