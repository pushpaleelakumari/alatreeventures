const crypto = require('crypto');

exports.generateApiKey = () => {
  return 'apikey-' + crypto.randomBytes(16).toString('hex');
};