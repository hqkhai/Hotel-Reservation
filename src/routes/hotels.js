const express = require('express')
const router = express.Router()
const hotelController = require("../app/controller/hotelController")
const verify = require("../middleware/verifyToken")

const verifyRoles =  require("../middleware/verifyRoles")
const ROLES_LIST = require("../config/allowedRoles")

//CREATE
router.post("/create", hotelController.createHotel)

//UPDATE
router.put("/update/:id", verifyRoles(ROLES_LIST.Admin), hotelController.updateHotel)

//DELETE
router.delete("/:id", verifyRoles(ROLES_LIST.Admin), hotelController.deleteHotel)

//GET
router.get("/get/:id", hotelController.getHotel)

//GETALL
router.get("/get", hotelController.getAllHotel)

router.get("/countByCity", hotelController.countByCity)
router.get("/countByType", hotelController.countByType)


router.get("/filter", hotelController.filterHotel)
//Default
router.get("/", hotelController.index)

module.exports = router