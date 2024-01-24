import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/lib/mongodb';
import Appointment from '@/models/appointment';

const getAppointmentByUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idDoctor } = req.query;
    const { idPatient } = req.query;
    try {
        await connectMongoDB();
        let appointment = null;
        if (idPatient) {
             appointment = await Appointment.find({ idPatient: idPatient });
        } else if (idDoctor) {
            appointment = await Appointment.find({ idDoctor: idDoctor });
        }
        if (!appointment) {
            res.status(500).json({ message: 'Error al autenticar' });
        } else {
            res.status(200).json(
                appointment.map((appointment) => ({
                    id: appointment._id,
                    idDoctor: appointment.idDoctor,
                    idPatient: appointment.idPatient,
                    title: appointment.title,
                    start: appointment.start,
                    end: appointment.end,
                }))
            )
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al autenticar' });
    }

}

export default getAppointmentByUser;