const fs = require("fs");
const glob = require('glob');
const path = require("path");
const program = require("commander");
const moment = require("moment");
const inquirer = require('inquirer');
const EventEmitter = require('events');

const formattedFileSystem = fileSystem =>
  fileSystem.map((file, index) => ({
    key: index,
    name: path.basename(file),
    value: file
  }));

const myEmitter = new EventEmitter();

myEmitter.on('event', filesPath => {
  filesPath.unshift('Back to Previous level');
  console.clear();
  receiver(filesPath);
});

// TODOS:
// move to helpers directory
const ResourceType = stats => stats.isDirectory() ? 'directory' : 'file';

// TODOS:
// stats function should be in own file.
const stats = pathResolved => {
  const fileStats = fs.statSync(pathResolved);

  // TODOS:
  // refactor size function
  if (ResourceType(fileStats) === 'directory') {
    const filesPath = glob.sync(`${pathResolved}/*`);
    myEmitter.emit('event', filesPath);
  } else {
    console.log("size", `${fileStats["size"]} bytes`)
  }

  console.log("last modify time:", moment(fileStats["mtime"]).fromNow());  
  console.log('Resource type:', ResourceType(fileStats));
};

const askQuestions = filesSystem => { 
  const questions = [
    {
      type: 'list',
      name: 'resource',
      message: 'Select a resource',
      choices: formattedFileSystem(filesSystem)
    }
  ];
  return inquirer.prompt(questions);
}

const receiver = async (filesSystem) => { 
  let answers = await askQuestions(filesSystem);
  // TODOS: 
  // - back to previous level only works in 2 first times. Later prints an error message
  if (answers.resource === 'Back to Previous level') {
    filesSystem.shift();
    const splitPath = filesSystem[0].split("/");
    const strippedPath = splitPath.slice(0, splitPath.length-2).join("/");
    answers = await askQuestions(glob.sync(`${strippedPath}/*`));
  }
  return stats(answers.resource);
};

program
  .version('1.0.0')
  .action(() => receiver(glob.sync(`${process.cwd()}/*`)))
  .parse(process.argv);