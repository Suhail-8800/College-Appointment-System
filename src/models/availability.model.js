const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const availabilitySchema = new mongoose.Schema(
  {
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // keep simple (YYYY-MM-DD)
      required: true,
    },
    slots: [slotSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);