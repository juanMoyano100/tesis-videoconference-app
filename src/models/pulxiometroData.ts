import mongoose, { Schema } from "mongoose";

const PulxiometroDataSchema = new Schema({
  id_paciente: {
    type: String,
  },
  ppm: {
    type: Number,
  },
  spo2: {
    type: Number,
  },
  id_pulsioximetro: { type: String },
  timestamp: { type: Date },
});

let PulxiometroData;

if (mongoose.models.pulsioximetroDataCompleto) {
    PulxiometroData = mongoose.model("pulsioximetroDataCompleto");
} else {
    PulxiometroData = mongoose.model(
        "pulsioximetroDataCompleto",
        PulxiometroDataSchema,
        "pulsioximetroDataCompleto"
    );
}

export default PulxiometroData;