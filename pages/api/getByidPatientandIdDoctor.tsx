import { connectMongoDB } from "@/lib/mongodb";
import Request from "@/models/request";
import { NextApiRequest, NextApiResponse } from "next";

const getByidPatientAndidDoctor = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { idDoctor, idPatient } = req.query;

  try {
    await connectMongoDB();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const request = await Request.findOne({
      idDoctor,
      idPatient,
      createdAt: { $gte: oneHourAgo },
    })
      .sort({ createdAt: -1 })
      .limit(1);
    if (!request) {
      return res.status(500).json({ message: "No se encontro la solicitud" });
    } else {
      return res.status(200).json({
        id: request._id,
        idDoctor: request.idDoctor,
        idPatient: request.idPatient,
        state: request.state,
      });
      // if (state === 'APROBADO') {
      //     // Generar y devolver un token JWT si la solicitud fue aceptada.
      //     const token = sign({ idDoctor, idPatient }, secret, { expiresIn: '1h' });
      //     return res.status(200).json({ token });
      // }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la solicitud" });
  }
};

export default getByidPatientAndidDoctor;
