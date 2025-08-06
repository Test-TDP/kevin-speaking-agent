

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queries = [
    'healthcare leadership conference Texas 2025',
    'healthcare leadership conference Texas 2026',
    'nonprofit medical speaker opportunities 2025',
    'nonprofit medical speaker opportunities 2026',
    'surgical and anesthesiology conference Texas 2025',
    'surgical and anesthesiology conference Texas 2026',
    'medical volunteer speaker opportunities 2025',
    'medical volunteer speaker opportunities 2026',
    'public health summit Texas 2025',
    'public health summit Texas 2026',
  ];

  const serpApiKey = process.env.SERPAPI_API_KEY;

  try {
    let allResults: any[] = [];

    for (const q of queries) {
      const response = await axios.get('https://serpapi.com/search.json', {
        params: {
          q,
          engine: 'google',
          api_key: serpApiKey,
          num: 10,
        },
      });

      const rawResults = response.data.organic_results || [];

      const filtered = rawResults.filter((result: any) =>
        result.title &&
        result.link &&
        !result.link.includes('vercel.com') &&
        !result.link.includes('github.com') &&
        !result.link.includes('linkedin.com')
      );

      allResults = allResults.concat(filtered);
    }

    res.status(200).json({ success: true, events: allResults });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
}
