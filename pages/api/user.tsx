import { AccessToken } from 'livekit-server-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import users from '../../public/users.json';

const authenticateHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (user && user.password === password) {
    const at = new AccessToken(user.id, email);
    const token = at.toJwt();
    res.status(200).json(
      {
        id: user.id,
        token: token,
        email: user.email,
        role: user.role,
        name: user.name,
      }
    );
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

export default authenticateHandler;
