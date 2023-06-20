const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apptSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", apptSchema);

module.exports = Appointment;
