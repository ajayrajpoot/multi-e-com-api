const Buyer = require('../models/buyer')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (body) => {

    try {

        // const errors = validationResult(body);

        if (!errors.isEmpty()) {
            throw new Error('Validation failed.');
        }

        Buyer.findOne({ email: body.email })
            .then(user => {
                if (user)
                    throw ('Email already Exist.');
            });

        const hashedPw = await bcrypt.hash(body.password, 12)
            .catch(err => {
                throw new Error(err.message || err);
            });

        const params = {
            name: body.name,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            password: hashedPw,
            address1: body.address1,
            address2: body.address2,
            city: body.city,
            state: body.state,
            country: body.country,
            zip: body.zip,
            active: body.active
        }

        const buyer = new Buyer(params);
        return buyer.save();

    } catch (error) {

        throw error;

    }
};

const login = async (body) => {
    const email = body.email;
    const password = body.password;
    let loadedUser;

    users.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecretsecret',
                { expiresIn: '1h' }
            );
            return { result: true, message: '', token: token, userId: loadedUser._id.toString() };
        })
        .catch(error => {
            throw error;
        });
};

const resetPassword = (body) => {
    Buyer.findOne({ email: email })
        .then(result => {
            if (result) {

                return { Message: 'Send OTP ', response: result, Result: true, OTP: 1234 };
            } else {
                throw { Message: 'Fail to Password Updated!', response: result, Result: false };
            }
        })
        .catch(err => {
            throw (err);
        });
}

const changePassword = (body) => {
    try {

        Buyer.findOne({ email: body.email, otp: body.otp }, { password: body.password })
            .then(result => {
                if (result) {
                    Buyer.updateOne({ _id: result._id }, { password: body.password }).then(r => {
                        if (r.ok) {
                            return { Message: 'Password Updated!', response: result, Result: true };

                        } else {
                            throw 'Fail to Password Updated!';

                        }
                    })
                } else {
                    throw ('Invalied OTP');
                }
            })
            .catch(error => {
                throw (error);
            });

    } catch (error) {
        throw (error);
    }
}

module.exports = { signup, login, resetPassword, changePassword }