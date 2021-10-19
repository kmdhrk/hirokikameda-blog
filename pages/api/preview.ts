import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404).end();
  }
  const id = req.query.slug;
  const draftKey = req.query.draftKey;

  const content = await fetch(
    `https://webdock.microcms.io/api/v1/blog/preview?${id}&draftKey=${draftKey}`,
    { headers: { 'X-API-KEY': process.env.API_KEY || '' } }
  )
  .then(res => res.json()).catch(error => null);

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/blog/${content.id}` });
  res.end('Preview mode enabled');
};

