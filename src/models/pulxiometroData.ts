import mongoose, { Schema, models } from "mongoose";

const PulxiometroDataSchema = new Schema({
  id_paciente: {
    type: String,
  },
  ppm: {
    type: Number,
  },
  timestamp: { type: Date },
});

let PulxiometroData: any;

if (mongoose.models.pulsioximetroDataCompleto) {
    PulxiometroData = mongoose.model("pulsioximetroDataCompleto", "pulsioximetroDataCompleto");
} else {
    PulxiometroData = mongoose.model(
        "pulsioximetroDataCompleto",
        PulxiometroDataSchema,
        "pulsioximetroDataCompleto"
    );
}

export default PulxiometroData;
