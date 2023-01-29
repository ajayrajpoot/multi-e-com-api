const Smtp = require('../models/smtp')

const getSmtp = async (par) => {
    return await Smtp.getSmtp(par);
}

const addSmtp = async (body) => {
    try {

        let p = {
            title: body.title,
            smtp_server: body.smtp_server,
            smtp_port: body.smtp_port,
            user_name: body.user_name,
            password: body.password,
            is_ssl: body.is_ssl,
            shop_id: body.shop_id,
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
            title: body.title,
            active: body.active,
            is_ssl: body.is_ssl,
            password: body.password,
            shop_id: body.shop_id,
            smtp_port: body.smtp_port,
            smtp_server: body.smtp_server,
            user_name: body.user_name,
        }
        const result = await Smtp.updateSmtp(id, params);

        console.log("update result", result)
        return result;
    } catch (error) {
        console.log("update error", error.message || error)
        throw error;
    }
}
const markPrimary = async (body, id) => {
    try {
        console.log("update result", body)

        const result = await Smtp.markPrimary(id);

        console.log("update result", result)
        return result;
    } catch (error) {
        console.log("update error", error.message || error)
        throw error;
    }
}

module.exports = { getSmtp, markPrimary, addSmtp, updateSmtp }