const express = require("express")
const router = express.Router();
const mapController = require("./../controller/mapController")
const authController = require("./../controller/authController")
router.route('/')
    .get(mapController.getMap)
    .post(authController.protect,mapController.updateMap);

module.exports = router;