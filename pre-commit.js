/* eslint-disable */
const fs = require('fs');
const uuid = require('uuid/v1');

const file = require('./package.json');
const newVersion =  uuid();
file['api-version'] = newVersion;

fs.writeFile('./package.json', JSON.stringify(file, null, 2), (err) => {
  if (err) {
    return console.log('pre-commit error', err);
  }
  return console.log(`pre-commit OK! Version GUID: ${newVersion}`);
});
