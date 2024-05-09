import { connectMongoDB } from "@/lib/mongodb";
import PulxiometroData from "@/models/pulxiometroData";
import { NextApiRequest, NextApiResponse } from "next";

const getPulxiometroInfo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id_pulsioximetro } = req.query;

  try {
    await connectMongoDB();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const oneMinutesAgo = new Date(Date.now() - 60 * 1000);
    if (!id_pulsioximetro) {
      return res.status(500).json({ message: "Error al obtener datos" });
    }
    const request = await (PulxiometroData as any).find({
      id_pulsioximetro,
      timestamp: { $gte: oneMinutesAgo },
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
