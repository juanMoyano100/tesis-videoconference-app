import { connectMongoDB } from "@/lib/mongodb";
import PulxiometroData from "@/models/pulxiometroData";
import { NextApiRequest, NextApiResponse } from "next";

const getPulxiometroInfo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id_paciente } = req.query;

  try {
    await connectMongoDB();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (!id_paciente) {
      return res.status(500).json({ message: "Error al obtener datos" });
    }
    const request = await PulxiometroData.find({
      id_paciente,
    //   timestamp: { $gte: oneHourAgo },
    }).sort({ createdAt: -1 });

    if (!request) {
      return res.status(500).json({ message: "Error al obtener datos" });
    } else {
      return res.status(200).json(request);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener datos" });
  }
};

export default getPulxiometroInfo;
