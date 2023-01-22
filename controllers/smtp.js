const Smtp = require('../models/smtp')

const getSmtp = async (shopId) => {
    return await Smtp.getSmtp(shopId);
}

const addSmtp = async (body) => {
    try {

        let p = {
            smtpServer: body.smtpServer,
            smtpPort: body.smtpPort,
            userName: body.userName,
            password: body.password,
            isSsl: body.isSsl,
            shopId: body.shopId,
            active: body.active,
        }
        console.log("body ", body)
        const result = await Smtp.addSmtp(p);
        //const result = await smtp.save();
        console.log("result", result)
        return result;
    } catch (error) {
        console.log("result", error)

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

        const result = await Smtp.updateSmtp(id, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        console.log("update error", error.message || error)
        throw error;
    }
}

module.exports = { getSmtp, addSmtp, updateSmtp }