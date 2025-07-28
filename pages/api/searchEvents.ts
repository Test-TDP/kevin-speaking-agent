// pages/api/searchEvents.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.q || 'medical nonprofit conference Texas 2024';
  const serpApiKey = process.env.SERPAPI_API_KEY;

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        q: query,
        engine: 'google',
        api_key: serpApiKey,
      },
    });

    const events = response.data.organic_results || [];

    res.status(200).json({ success: true, events });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
}
