const yup = require("yup");
const signupValidation = yup.object().shape({
    name: yup.string().required(),
    phone: yup.number().required(),
    email: yup.string(),
    password: yup.string().required()
});

module.exports = { signupValidation }