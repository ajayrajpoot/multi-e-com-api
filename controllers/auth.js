const Buyer = require('../models/buyer');
const Comman = require('../module/comman');
const mail = require('./mail');
const sms = require('./sms');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const msendmail = require('../module/MAIL/msendmail');
const consStatic = require('../static/consts.json');

// console.log(Comman.base64Encoding('18241'))
const signup = async (body) => {

    try {
        let user = await Buyer.getBuyer({ email: body.email })
        if (user.length)
            throw ('Email already Exist.');
        const hashedPw = body.password;//await bcrypt.hash(body.password, 12)
        // .catch(err => {
        //     throw new Error(err.message || err);
        // });

        let otp = Comman.getotp(4);
        console.log("otp>>", otp)
        let encotp = Comman.base64Encoding(otp);

        const params = {
            name: body.name,
            email: body.email,
            phone: body.phone,
            password: hashedPw,
            vcode: otp,
        }

        const buyer = await Buyer.addBuyer(params);

        if (buyer) {
            let mailBody = `Hello ,  OTP:${encotp} , <a href="${consStatic.VERIFY_LINK}${encotp}">Verify</a>`;
            await mail.sendmail({ subject: 'Verify OTP Link', html: mailBody, buyerID: '', email: body.email, name: body.name })
        }

        return buyer;

    } catch (error) {
        console.log("error", error?.message || error);
        throw error;

    }
};

const login = async (body) => {

    try {
        console.log("loadedUser---->", body);

        const email = body.email;
        const password = body.password;
        let loadedUser;

        const result = await Buyer.getBuyer({ email: email });

        if (!result.length) {
            throw new Error('A user with this email could not be found.');
        }

        loadedUser = result[0];
        console.log("loadedUser---->", loadedUser.password);

        // let isEqual = await bcrypt.compare(password, loadedUser.password);
        let isEqual = password == loadedUser.password;
        console.log("isEqual---->", isEqual);

        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser.id
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );
        return { result: true, message: '', token: token, userId: loadedUser.id };

        // })
        // .catch(error => {
        //     throw error;
        // });

    } catch (error) {
        throw error;
    }
};

const loginOTP = async (body) => {

    try {
        console.log("loadedUser---->", body);

        const email = body.email;
        let loadedUser;

        const result = await Buyer.getBuyer({ email: email });

        if (!result.length) {
            throw new Error('A user with this email could not be found.');
        }

        loadedUser = result[0];

        let otp = Comman.getotp(4);
        console.info('Login OTP:' + otp);
        const params = {
            logincode: otp,
        }

        const buyer = await Buyer.updateBuyer(loadedUser.id, params);

        const smsTxt = `Login OTP: ${otp}`;
        await sms.send_otp(smsTxt);

        let mailBody = `Hello ,  LOGIN OTP:${otp} `;
        await mail.sendmail({ subject: 'Login OTP', html: mailBody, email: result.email, name: result.name })

        return { result: true, message: 'OTP send' };
    } catch (error) {
        throw error;
    }
};

const loginOTPVerify = async (body) => {

    try {
        console.log("loadedUser---->", body);

        const email = body.email;
        const otp = body.otp;
        let loadedUser;

        const result = await Buyer.getBuyer({ email: email });

        if (!result.length) {
            throw new Error('A user with this email could not be found.');
        }
        loadedUser = result[0];
        if (loadedUser.logincode != otp) {
            throw new Error('Invalied OTP.');


        }

        const buyer = await Buyer.updateBuyer(loadedUser.id, { logincode: 0 });

        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser.id
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );
        return { result: true, message: '', token: token, userId: loadedUser.id, loadedUser: loadedUser };

    } catch (error) {
        throw error;
    }
};
 
const verifylink = async (body) => {

    try {
        let decrotp = Comman.base64Decoding(body.vlink);

        let [user] = await Buyer.getBuyer({ vcode: decrotp });
        if (!user.id)
            throw ('Invalied code.');

        const params = { verify_email: 1 }

        const buyer = await Buyer.updateBuyer(user.id, params);
        return buyer;

    } catch (error) {
        console.log("error", error?.message || error)
        throw error;
    }
};

const verifyotp = async (body) => {
    try {

        let [user] = await Buyer.getBuyer({ vcode: body.otp });
        if (!user.id)
            throw ('Invalied code.');

        const params = { verify_phone: 1 };

        const buyer = await Buyer.updateBuyer(user.id, params);


        let prm = {
            to: user.eamil,
            name: p.name,
            subject: p.subject,
            html: p.html,

        }
        console.log(__line, prm);
        let rep = msendmail.emailText(prm.to, prm.name, prm.subject, prm.html);

        return buyer;

    } catch (error) {
        console.log("error", error?.message || error)
        throw error;

    }
};

const resetPassword = async (body) => {

    try {
        let otp = Comman.getotp(4);
        console.log("otp", otp);

        let result = await Buyer.getBuyer({ email: body.email });
        if (result) {
            return { Message: 'Send OTP ', response: result, Result: true, OTP: otp };
        } else {
            throw { Message: 'Fail to Password Updated!', response: result, Result: false };
        }
    } catch (error) {
        throw (err);
    }

};

const changePassword = async (body) => {

    try {

        let result = await Buyer.getBuyer({ email: body.email, password: body.password }, body.otp);

        if (result.length) {
            Buyer.updateBuyer({ _id: result.id }, { password: body.password }).then(r => {
                if (r.ok) {
                    return { Message: 'Password Updated!', response: result, Result: true };

                } else {
                    throw 'Fail to Password Updated!';

                }
            })
        } else {
            throw ('Invalied OTP');
        }
        // })
        // .catch(error => {
        //     throw (error);
        // });

    } catch (error) {
        throw (error);
    }

}

module.exports = { signup, login, resetPassword, changePassword, verifylink, verifyotp }