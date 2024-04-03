import mongoose, { Schema, models } from "mongoose";

const PulxiometroDataSchema = new Schema({
  id_paciente: {
    type: String,
  },
  ppm: {
    type: Number,
  },
  id_pulsioximetro: { type: String },
  timestamp: { type: Date },
});

let PulxiometroData: any;

if (mongoose.models.pulsioximetroDataCompleto) {
    PulxiometroData = mongoose.model("pulsioximetroDataCompleto",PulxiometroDataSchema, "pulsioximetroDataCompleto");
} else {
    PulxiometroData = mongoose.model(
        "pulsioximetroDataCompleto",
        PulxiometroDataSchema,
        "pulsioximetroDataCompleto"
    );
}

export default PulxiometroData;
