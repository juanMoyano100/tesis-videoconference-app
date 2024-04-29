import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

const getUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query
  try {
    await connectMongoDB();
    if (!email) {
      res.status(500).json({ message: 'Error al autenticar' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(500).json({ message: 'Error al autenticar' });
    } else {
      res.status(200).json(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        }
      )
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar' });
  }
}

export default getUserByEmail;
