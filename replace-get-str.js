require('dotenv').config();

const PROJECT_FILES_PATH = process.env.PROJECT_FILES_PATH;
const GENERATED_KEYS_IMPORT_STATEMENT = process.env.GENERATED_KEYS_IMPORT_STATEMENT;

// I wanna find all occurences of the calling of the function
// 'getStr' or in the project, and do like the following:
// getStr('key') -> getStr(LocaleKeys.key)
// and add the value of GENERATED_KEYS_FILE_PATH to the top of the file

const fs = require('fs');

// loop the project files:
// for each file, read it and replace all the keys with the new keys
// then write the file back
const recursive = require('recursive-readdir');

const replaceForFile = (file) => {
    let fileContent = fs.readFileSync(file, 'utf8');

    let prevFileContent = fileContent;
    // there can be spaces and line breaks between the function name and the
    // quote of the key
    fileContent = fileContent.replace(/getStr\s*\(\s*(['"])([^'"]+)\1\s*\)/g, 'getStr(LocaleKeys.$2)');

    // if the content changed, add the import
    if (prevFileContent !== fileContent) {
        fileContent = `${GENERATED_KEYS_IMPORT_STATEMENT}\n` + fileContent;
    }

    fs.writeFileSync(file, fileContent);
}

recursive(PROJECT_FILES_PATH, function (err, files) {
    // Files is an array of filename
    console.log(files);
    files.forEach(replaceForFile);
});
