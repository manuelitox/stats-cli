const fs = require("fs");
const path = require("path");
const program = require("commander");
const moment = require("moment");

// TODOS: 
// - Install and integrate inquirer package.
// - get resources (directories and files) of a path.
// - display resources list in inquirer.
// - Allows select a resource

// TODOS:
// move to helpers directory
const isFile = mode => mode & 0100000 ? 'file' : '-';
const isDirectory = mode => mode & 0040000 ? 'directory' : '-';
const ResourceType = mode => isFile(mode) ? isFile(mode) : isDirectory(mode)

// TODOS:
// stats function should be in own file.
const stats = yourPath => (
  fs.stat(yourPath, (err, stats) => {
    // TODOS:
    // missing error function.

    // TODOS:
    // refactor size function
    console.log("size", stats["size"])

    // TODOS: 
    // refactor last modify time function
    console.log("last modify time:", moment(stats["mtime"]).fromNow());
  
    const mode = stats["mode"];
    console.log('Resource type:', ResourceType(mode));
  })  
);

const receiver = yourPath => {
  const pathResolved = path.resolve(yourPath);
  return stats(pathResolved);
};

program
  .version('1.0.0')
  .option('-p, --your-path', 'Add a path')
  .action(receiver)
  .parse(process.argv);