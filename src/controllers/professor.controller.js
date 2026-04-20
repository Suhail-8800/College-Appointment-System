const Availability = require("../models/availability.model");
const Appointment = require("../models/appointment.model");


// Add availability
exports.addAvailability = async (req, res) => {
  try {
    const { date, slots } = req.body;

    const availability = await Availability.create({
      professorId: req.user.userId,
      date,
      slots,
    });

    res.status(201).json({
      message: "Availability added",
      availability,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Cancle appoinments
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only that professor can cancel
    if (appointment.professorId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Mark appointment cancelled
    appointment.status = "cancelled";
    await appointment.save();

    // Free the slot again
    const availability = await Availability.findOne({
      professorId: appointment.professorId,
      date: appointment.date,
    });

    const slot = availability.slots.find(
      (s) => s.startTime === appointment.startTime
    );

    if (slot) {
      slot.isBooked = false;
      await availability.save();
    }

    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};