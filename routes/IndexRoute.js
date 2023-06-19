const express = require("express");
const router = express();

const IndexRouter = require('../controllers/IndexController');

router.get('/ping', IndexRouter.index);

module.exports = router;