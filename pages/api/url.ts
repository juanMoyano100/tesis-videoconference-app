import { NextApiRequest, NextApiResponse } from 'next';

export function getLiveKitURL(region?: string | string[]): string {
    let targetKey = 'LIVEKIT_URL';
    if (region && !Array.isArray(region)) {
      targetKey = `LIVEKIT_URL_${region}`.toUpperCase();
    }
    const url = process.env[targetKey];
    if (!url) {
      throw new Error(`${targetKey} is not defined`);
    }
    return url;
  }

export default async function handleServerUrl(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { region } = req.query;

    if (Array.isArray(region)) {
      throw Error('provide max one region string');
    }
    const url = getLiveKitURL(region);
    res.status(200).json({ url });
  } catch (e) {
    res.statusMessage = (e as Error).message;
    res.status(500).end();
  }
}