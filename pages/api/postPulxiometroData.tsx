// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, Db, Collection } from "mongodb";

const mongoUri =
  "mongodb+srv://moyanojuang:x3v03zdRbFlMilMu@cluster0.mjs5uaa.mongodb.net/videoconference";
const databaseName = "videoconference";

const apikeyvalue1 = "data1";
const apikeyvalue2 = "data2";
const apikeyvalue3 = "data3";

let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(mongoUri);
  const db = client.db(databaseName);
  cachedDb = db;
  return db;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const db = await connectToDatabase();
    const apikey = req.body.api_key;

    if (apikey === apikeyvalue1) {
      return res.status(200).json({ message: "Handled apikeyvalue1." });
    } else if (apikey === apikeyvalue2) {
      const collection: Collection = db.collection("pulsioximetroDataCompleto");
      const id_pulsioximetro = req.body.id_pulsioximetro;
      const ppm = req.body.ppm;
      const document = {
        id_paciente: "",
        id_pulsioximetro: id_pulsioximetro,
        ppm: parseInt(ppm),
        timestamp: new Date(), // Current timestamp
      };
      const result = await collection.insertOne(document);

      if (result) {
        return res.status(200).json({ message: "Document inserted successfully." });
      } else {
        return res.status(500).json({ message: "Error." });
      }
    } else if (apikey === apikeyvalue3) {
      const collection: Collection = db.collection("pulsioximetroData");
      const id_pulsioximetro = req.body.id_pulsioximetro;
      const ppm_avg = req.body.ppm_avg;
      const spo2_avg = req.body.spo2_avg;
      const document = {
        id_paciente: "",
        id_pulsioximetro: id_pulsioximetro,
        ppm_avg: parseInt(ppm_avg),
        spo2_avg: parseInt(spo2_avg),
        timestamp: new Date(), // Current timestamp
      };
      const result = await collection.insertOne(document);

      if (result) {
        return res.status(200).json({ message: "Document inserted successfully." });
      } else {
        return res.status(500).json({ message: "Error." });
      }
    }
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;