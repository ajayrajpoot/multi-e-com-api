const Smtp = require('../models/smtp')

const getSmtp = async (shopId) => {
    if (shopId) {
        return await Smtp.find({ shopId: shopId });
    }
    else
        return await Smtp.find();
}

const addSmtp = async (body) => {
    try {

        const smtp = new Smtp(body);
        const result = await smtp.save();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateSmtp = async (body, id) => {
    try {
        console.log("update result", body)

        const params = {
            active: body.active,
            isSsl: body.isSsl,
            password: body.password,
            shopId: body.shopId,
            smtpPort: body.smtpPort,
            smtpServer: body.smtpServer,
            userName: body.userName,
        }

        // JSON.parse(JSON.stringify(body));

        const result = await Smtp.update({ _id: id }, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        console.log("update error", error.message || error)
        throw error;
    }
}

module.exports = { getSmtp, addSmtp, updateSmtp }