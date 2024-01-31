

import { connectMongoDB } from "@/lib/mongodb"
import Request from "@/models/request";
import { NextApiRequest, NextApiResponse } from "next"

const putRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const  requestData = req.body;
    try {
      await connectMongoDB();
        
      const request = await Request.findByIdAndUpdate(id, requestData, { new: true });
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      return res.status(200).json(request);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating request' });
    }
  }
  
  export default putRequest;