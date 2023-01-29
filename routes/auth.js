var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth')

const userValidator = require('../validation/buyer.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', async (req, res, next) => {
  try {
    const body = req.body;
    console.log("body-->", body)

    await userValidator.signupValidation.validate(body);

    const result = await auth.signup(body);
    console.log("result-->", result);

    if (result.insertId) {
      res.json({ result: true, message: "Signup success" });
    } else {
      throw new Error("Fail to Success");
    }

  } catch (error) {
    res.json({ result: false, message: error.message || error });
  }

});

router.get('/verifylink', async (req, res, next) => {
  try {
    const vlink = req.query.vlink;

    if (!vlink)
      throw new Error('invalied vlink link.');

    const result = await auth.verifylink(req.query);
    console.log("result-->", result);

    if (result.affectedRows) {
      res.json({ result: true, message: "OTP verify successfully" });
    } else {
      throw new Error("Fail verify OTP");
    }

  } catch (error) {
    res.json({ result: false, message: error.message || error });
  }

});


router.get('/verifyotp', async (req, res, next) => {
  try {
    const body = req.query;
    console.log("body-->", body)

    if (!body.email || !body.otp)
      throw new Error('email and OTP required')

    const result = await auth.verifyotp(body); 

    if (result.affectedRows) {
      res.json({ result: true, message: "OTP verify successfully" });
    } else {
      throw new Error("Fail verify OTP");
    }

  } catch (error) {
    res.json({ result: false, message: error.message || error });
  }

});


router.post('/login', async (req, res, next) => {

  try {

    const result = await auth.login(req.body);
    console.log("result", result)

    if (result) {
      res.json({ result: true, message: "  success", data: result });
    } else {
      throw new Error("Fail to Success");
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
