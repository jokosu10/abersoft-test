const express = require("express");
const router = express();

const IndexRouter = require('../controllers/PingController');

router.get('/', IndexRouter.hello);
router.get('/ping', IndexRouter.ping)

module.exports = router;