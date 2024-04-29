import { connectMongoDB } from "@/lib/mongodb"
import Appointment from "@/models/appointment"
import { NextApiRequest, NextApiResponse } from "next"


const createAppointment = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idDoctor, idPatient, title, start, end } = req.body;
    try {
        await connectMongoDB();
        const appoinment = await Appointment.create({ idDoctor, idPatient, title, start, end });
        if (!appoinment) {
            res.status(500).json({ message: 'Error al crear la cita, datos invalidos' });
        } else {
            res.status(200).json(
                {
                    id: appoinment._id,
                    idDoctor: appoinment.idDoctor,
                    idPatient: appoinment.idPatient,
                    title: appoinment.title,
                    start: appoinment.start,
                    end: appoinment.end,
                }
            )
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la cita' });
    }
}

export default createAppointment;

