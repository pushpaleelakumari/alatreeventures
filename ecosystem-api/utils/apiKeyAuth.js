const config = require('../config/platforms.json');

exports.apiKeyAuth = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  const platform = req.body.source;

  if (!apiKey || !platform || config[platform] !== apiKey) {
    return res.status(403).json({ error: 'Unauthorized: Invalid API key or platform' });
  }

  next();
};