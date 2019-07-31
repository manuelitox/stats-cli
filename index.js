const fs = require("fs");
const path = require("path");
const program = require("commander");
const moment = require("moment");
const inquirer = require('inquirer');
const glob = require('glob');

// TODOS: 
// - Install and integrate inquirer package.
// - get resources (directories and files) of a path.
// - display resources list in inquirer.
// - Allows select a resource

// TODOS:
// move to helpers directory
const ResourceType = stats => stats.isDirectory() ? 'directory' : 'file';

// TODOS:
// stats function should be in own file.
const stats = pathResolved => {
  const fileStats = fs.statSync(pathResolved);
  // TODOS:
  // missing error function.

  // TODOS:
  // refactor size function
  if (ResourceType(fileStats) === 'directory') {
    console.log("open directory");
  } else {
    console.log("size", `${fileStats["size"]} bytes`)
  }

  // TODOS: 
  // refactor last modify time function
  console.log("last modify time:", moment(fileStats["mtime"]).fromNow());
  
  console.log('Resource type:', ResourceType(fileStats));
};

const receiver = () => {
  const currentFileSystem = glob.sync(`${process.cwd()}/*`);
  const formattedFileSystem = currentFileSystem.map(file => path.basename(file));
  
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'resource',
        message: 'Select a resource',
        choices: formattedFileSystem
      }
    ])
    .then(answers => {
      const pathResolved = path.resolve(answers.resource);
      return stats(pathResolved); 
    });
};

program
  .version('1.0.0')
  .action(receiver)
  .parse(process.argv);