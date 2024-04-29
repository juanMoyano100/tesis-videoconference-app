import { connectMongoDB } from "@/lib/mongodb"
import Request from "@/models/request";
import { NextApiRequest, NextApiResponse } from "next"
import { sign } from 'jsonwebtoken';

const createRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idDoctor, idPatient, state } = req.body;
    const secret = process.env.NEXTAUTH_SECRET ?? ""
    try {
        await connectMongoDB();
        const request = await Request.create({ idDoctor, idPatient, state });
        if (!request) {
            res.status(500).json({ message: 'Error al crear la solicitud' });
        } else {
            res.status(200).json(
                {
                    id: request._id,
                    idDoctor: request.idDoctor,
                    idPatient: request.idPatient,
                    state: request.state,
                }
            )
            // if (state === 'APROBADO') {
            //     // Generar y devolver un token JWT si la solicitud fue aceptada.
            //     const token = sign({ idDoctor, idPatient }, secret, { expiresIn: '1h' });
            //     return res.status(200).json({ token });
            // }
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la solicitud' });
    }
}

export default createRequest;

