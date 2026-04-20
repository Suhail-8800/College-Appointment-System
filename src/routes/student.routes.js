const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  getAvailableSlots,
  bookAppointment,
  getMyAppointments
} = require("../controllers/student.controller");

// GET availability
router.get(
  "/availability/:professorId",
  authMiddleware,
  roleMiddleware("student"),
  getAvailableSlots
);

// POST booking
router.post(
  "/book",
  authMiddleware,
  roleMiddleware("student"),
  bookAppointment
);

router.get(
  "/my-appointments",
  authMiddleware,
  roleMiddleware("student"),
  getMyAppointments
);

module.exports = router;