const fs = require('fs');
const path = require('path');
const { generateApiKey } = require('../utils/keyGenerator');

const txFile = path.join(__dirname, '../data/transactions.json');
const platformsFile = path.join(__dirname, '../config/platforms.json');

exports.getDashboardData = (req, res) => {
  let data = [];

  if (fs.existsSync(txFile)) {
    data = JSON.parse(fs.readFileSync(txFile));
  }

  const total = data.length;
  const recent = data.slice(-10).reverse();

  const mapping = {};
  data.forEach(entry => {
    entry.targets.forEach(target => {
      const key = `${entry.source} → ${target}`;
      mapping[key] = (mapping[key] || 0) + 1;
    });
  });

  res.json({ total, recent, mapping });
};

exports.addPlatform = (req, res) => {
  const { platform } = req.body;

  if (!platform || typeof platform !== 'string') {
    return res.status(400).json({ error: 'Invalid platform name' });
  }

  const config = fs.existsSync(platformsFile)
    ? JSON.parse(fs.readFileSync(platformsFile))
    : {};

  if (config[platform]) {
    return res.json({ apiKey: config[platform] });
  }

  const newKey = generateApiKey();
  config[platform] = newKey;

  fs.writeFileSync(platformsFile, JSON.stringify(config, null, 2));
  res.json({ platform, apiKey: newKey });
};
