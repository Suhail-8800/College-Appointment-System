const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const { addAvailability, cancelAppointment } = require("../controllers/professor.controller");

// Only professors allowed
router.post(
  "/availability",
  authMiddleware,
  roleMiddleware("professor"),
  addAvailability
);
router.delete(
  "/appointments/:appointmentId",
  authMiddleware,
  roleMiddleware("professor"),
  cancelAppointment
);

module.exports = router;