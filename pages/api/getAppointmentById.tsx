import { connectMongoDB } from "@/lib/mongodb";
import Appointment from "@/models/appointment";
import { NextApiRequest, NextApiResponse } from "next";

const getAppointmentById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        await connectMongoDB();
        if (!id) {
            res.status(500).json({ message: 'Error al obtener cita' });
        }
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            res.status(500).json({ message: 'Error al obtener cita' });
        } else {
            res.status(200).json(
                {
                    id: appointment._id,
                    idDoctor: appointment.idDoctor,
                    idPatient: appointment.idPatient,
                    title: appointment.title,
                    start: appointment.start,
                    end: appointment.end,
                }
            )
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cita' });
    }
}

export default getAppointmentById;