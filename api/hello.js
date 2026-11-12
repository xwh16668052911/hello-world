// Vercel Serverless Function
// 访问路径：/api/hello

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    message: 'Hello, World!',
    ok: true,
    method: req.method,
    time: new Date().toISOString(),
    region: process.env.VERCEL_REGION || 'local',
  });
}
