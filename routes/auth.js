var express = require('express');
var router = express.Router();
const buyer = require('../controllers/buyer')

const userValidator = require('../validation/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', async (req, res, next) => {
  try {
    const body = req.body;
    await userValidator.user.validate(body);

    const result = await buyer.signup(body);

    if (result._id) {
      res.json({ result: true, message: "Signuup success" });
    } else {
      throw new Error("Fail to Success");
    }

  } catch (error) {

    next(error);

  }
});

router.post('/login', async (req, res, next) => {

  try {

    const result = await buyer.login(req.body);

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
