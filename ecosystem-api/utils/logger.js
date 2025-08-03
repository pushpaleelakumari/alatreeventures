const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/transactions.json');

exports.logTransaction = (entry) => {
  let data = [];

  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file));
  }

  data.push(entry);

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};