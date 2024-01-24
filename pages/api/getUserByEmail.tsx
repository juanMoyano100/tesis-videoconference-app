import { AccessToken } from 'livekit-server-sdk';
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
    // const at = new AccessToken(user.id, email as string);
    // const token = at.toJwt();
    if (!user) {
      res.status(500).json({ message: 'Error al autenticar' });
    } else {
      res.status(200).json(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          // token
        }
      )
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al autenticar' });
  }
}

export default getUserByEmail;
