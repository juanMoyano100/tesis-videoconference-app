import mongoose, { Schema, models } from "mongoose";

const appointmentSchema = new Schema(
  {
    id: {
      type: String,
    },
    idDoctor: {
      type: String,
      required: true,
    },
    idPatient: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    start: { type: Date },
    end: { type: Date },
  },
  { timestamps: true }
);

const Appointment =
  models.Appointment || mongoose.model("Appointment", appointmentSchema);
export default Appointment;
