const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // input-file and library-file defined in action metadata file
  // If either of these files is missing, do not proceed.
  const inputFile = core.getInput('input-file');
  const libraryFile = core.getInput('library-file');
  let inputJPath = core.getInput('new-json-path');
  let libraryJPath = core.getInput('old-json-path');
  const inputFileExists = fs.existsSync(inputFile);
  const libraryFileExists = fs.existsSync(libraryFile);
  if (inputJPath == '') {
    console.log('Root of Input file: ' + inputFile);
  }
  else {
    inputJPath = '.' + inputJPath;
  }
  if (libraryJPath == '') {
    console.log('Root of Library file: ' + libraryFile);
  else {
      libraryJPath = '.' + libraryJPath;
    }
  }


  if (inputFileExists && libraryFileExists) {
    const newdata = JSON.parse(fs.readFileSync(inputFile))
    const master = JSON.parse(fs.readFileSync(libraryFile))

    console.log('Library/Master file: ' + libraryFile);
    console.log('newData file: ' + inputFile);

    let newJSON = eval("newdata" + inputJPath) // JSON Path as string
    let libraryJSON = eval("master" + libraryJPath);
    let result = {};
    let key;

    // First remap the resulting json. This will be the lookup json in the actions repo
    for (key in libraryJSON) {
      if (libraryJSON.hasOwnProperty(key)) {
        result[key] = libraryJSON[key];
      }
    }

    // Then overlay the new json info.
    // This will overwrite the object if it exists
    for (key in newJSON) {
      if (newJSON.hasOwnProperty(key)) {
        result[key] = newJSON[key];
      }
    }
    console.log(result)
    fs.writeFile(libraryFile, JSON.stringify(result, null, 2), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
  } else {
    if (!inputFileExists) console.log('Missing ' + inputFile + ' json source file');
    if (!libraryFileExists) console.log('Missing ' + libraryFile + ' json source file');

  }
} catch (error) {
  core.setFailed(error.message);
}