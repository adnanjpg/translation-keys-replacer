require('dotenv').config();

const PROJECT_FILES_PATH = process.env.PROJECT_FILES_PATH;
const JSON_FILE_PATH = process.env.JSON_FILE_PATH;

// i wanna read all the keys in the json file and store them in an array
const fs = require('fs');

const jsonFile = fs.readFileSync(JSON_FILE_PATH, 'utf8');
const jsonFileParsed = JSON.parse(jsonFile);
const jsonFileKeys = Object.keys(jsonFileParsed);

console.log(jsonFileKeys);

// now for each file (recursive) in the project files path, I wanna find
// all occurences of the keys in the json file and replace them with the
// same keys but replacing ':', '.', '-' with '_' and each capital letter with
// its lowercase version and a '_' before it IF it's not the first letter

// for example: 'SelectedListingPeriod.Daily' -> 'selected_listing_period_daily'
// 'widgets:dialog_popup:confirm' -> 'widgets_dialog_popup_confirm'

// loop the project files:
// for each file, read it and replace all the keys with the new keys
// then write the file back

const recursive = require('recursive-readdir');

const replaceForFile = (file) => {
    let fileContent = fs.readFileSync(file, 'utf8');
    jsonFileKeys.forEach((key) => {
        // make sure to replace ALL occurences of each
        // pattern
        let newKey = key
            .replace(/:/g, '_')
            .replace(/\./g, '_')
            .replace(/-/g, '_')

            // replace first letter
            .replace(/([A-Z])/g, '_$1')
            .replace(/^_/, '')

            .toLowerCase();
        fileContent = fileContent.replace(key, newKey);
    });
    fs.writeFileSync(file, fileContent);
}

recursive(PROJECT_FILES_PATH, function (err, files) {
    // Files is an array of filename
    console.log(files);
    files.forEach(replaceForFile);
});

// now do replacement for the json file itself
replaceForFile(JSON_FILE_PATH);
