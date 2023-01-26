const yup = require("yup");
const signupValidation = yup.object().shape({
    name: yup.string().required(),
    mobile: yup.number().max(10).min(10).required(),
    email: yup.string(),
    password: yup.string().required()
});

module.exports = { signupValidation }