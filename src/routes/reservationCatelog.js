const express = require('express')
const router = express.Router()
const reservationCatelogController = require("../app/controller/reservationCatelogController")
const verify = require("../middleware/verifyToken")

const verifyRoles = require("../middleware/verifyRoles")
const ROLES_LIST = require("../config/allowedRoles")

//UPDATE
router.put("/update/:id", verifyRoles(ROLES_LIST.Admin), reservationCatelogController.updateReservationCatelog)

//CREATE
router.post("/create", verifyRoles(ROLES_LIST.Admin), reservationCatelogController.createReservationCatelog)

//DELETE
router.delete("/:id", verifyRoles(ROLES_LIST.Admin), reservationCatelogController.deleteReservationCatelog)

//GET
router.get("/:id",verifyRoles(ROLES_LIST.Admin), reservationCatelogController.getReservationCatelog)

//GETALL
router.get("/",verifyRoles(ROLES_LIST.Admin), reservationCatelogController.getAllReservationCatelog)

module.exports = router