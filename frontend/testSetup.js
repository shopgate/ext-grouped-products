const fs = require('fs');
const path = require('path');

const hasLerna = fs.existsSync(path.resolve('../../../lerna.json'));
if (hasLerna) {
  throw new Error('Executing test within PWA mono repo would cause wrong travis snapshots due to some mocking of PWA');
}
