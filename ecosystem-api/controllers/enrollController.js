const { logTransaction } = require('../utils/logger');
const { syncToCRM } = require('../utils/crmSync');
const fs = require('fs');

const existingData = fs.existsSync('./data/transactions.json')
  ? JSON.parse(fs.readFileSync('./data/transactions.json'))
  : [];

exports.handleEnrollment = async (req, res) => {
  console.log(`Loaded ${JSON.stringify(existingData)} existing transactions.`);
  const { email, source, targets } = req.body;

  if (!email || !source || !Array.isArray(targets)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  if (existingData.some(tx => tx.email === email && tx.source === source && JSON.stringify(tx.targets) === JSON.stringify(targets))) {
    return res.status(400).json({ error: 'Duplicate transaction detected' });
  }

  const transaction = {
    email,
    source,
    targets,
    date: new Date().toISOString(),
  };

  logTransaction(transaction);

  for (const target of targets) {
    await syncToCRM(target, transaction);
  }

  res.json({ status: 'success', syncedTo: targets });
};