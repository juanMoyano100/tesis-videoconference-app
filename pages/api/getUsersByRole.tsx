import { AccessToken } from 'livekit-server-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

const getUsersByRole = async (req: NextApiRequest, res: NextApiResponse) => {
    const { role } = req.query;
    try {
        await connectMongoDB();
        if (!role) {
            res.status(500).json({ message: 'Error al autenticar' });
        }
        const users = await User.find({ role });
        if (!users) {
            res.status(500).json({ message: 'Error al autenticar' });
        } else {
            res.status(200).json(
                users.map((user) => ({
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                }))
            )
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al autenticar' });
    }

};

export default getUsersByRole;