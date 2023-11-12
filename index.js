require('dotenv').config();

const PROJECT_FILES_PATH = process.env.PROJECT_FILES_PATH;
const JSON_FILE_PATH = process.env.JSON_FILE_PATH;

// i wanna read all the keys in the json file and store them in an array
const fs = require('fs');

const jsonFile = fs.readFileSync(JSON_FILE_PATH, 'utf8');
const jsonFileParsed = JSON.parse(jsonFile);
const jsonFileKeys = Object.keys(jsonFileParsed);

console.log(jsonFileKeys);
