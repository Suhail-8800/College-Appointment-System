const Availability = require("../models/availability.model");
const Appointment = require("../models/appointment.model");

exports.bookAppointment = async (req, res) => {
  try {
    const { professorId, date, startTime } = req.body;

    // Find availability for that date
    const availability = await Availability.findOne({
      professorId,
      date,
    });

    if (!availability) {
      return res.status(404).json({ message: "No availability found" });
    }

    // Find the slot
    const slot = availability.slots.find(
      (s) => s.startTime === startTime
    );

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Check if already booked
    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Mark slot as booked
    slot.isBooked = true;

    await availability.save();

    // Create appointment
    const appointment = await Appointment.create({
      studentId: req.user.userId,
      professorId,
      date,
      startTime,
      endTime: slot.endTime,
    });

    res.status(201).json({
      message: "Appointment booked",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// View available slots for a professor
exports.getAvailableSlots = async (req, res) => {
  try {
    const { professorId } = req.params;

    const availability = await Availability.find({ professorId });

    // Filter only unbooked slots
    const result = availability.map((day) => ({
      date: day.date,
      slots: day.slots.filter((slot) => !slot.isBooked),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      studentId: req.user.userId,
      status: "booked",
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};