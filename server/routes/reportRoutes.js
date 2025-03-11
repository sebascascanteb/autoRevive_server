const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

router.get("/mostsoldProducts/", reportController.getMostSoldProducts)
router.get("/mostsoldServices/", reportController.getMostSoldServices)
router.get("/reservationPerBranch", reportController.getReservationPerBranch)
router.get("/reservationPerBranchManager/:id", reportController.getReservationPerBranchManager)

module.exports = router;