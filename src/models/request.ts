import mongoose, { Schema, models } from "mongoose";

const requestSchema = new Schema(
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
    state: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Request =
  models.Request || mongoose.model("Request", requestSchema);
export default Request;
