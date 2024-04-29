import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = await req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectMongoDB();
      const response = await User.create({ email, password: hashedPassword });
      return res.status(200).json({ response, message: "Usuario registrado correctamente." });
    } catch (error) {
      return res.status(500).json({ message: "Error al registrar el usuario." });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }

}