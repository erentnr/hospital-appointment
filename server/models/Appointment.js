const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
      default: null,
    },
    appointmentDate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppointmentDate",
      required: true,
    },
    appointmentStatus: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { versionKey: false }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
