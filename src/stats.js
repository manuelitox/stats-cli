const fs = require("fs");
const glob = require("glob");
const chalk = require("chalk");
const moment = require("moment");

const Helpers = require("./helpers");

const stats = (pathResolved, myEmitter) => {
  const fileStats = fs.statSync(pathResolved);

  if (Helpers.ResourceType(fileStats) === "directory") {
    const filesPath = glob.sync(`${pathResolved}/*`);
    return myEmitter.emit("event", filesPath);
  }

  console.log(`
  
    Information:
    ___________________________________________________

    Size: ${chalk.green(`${fileStats["size"]} bytes`)}
    Last modify time: ${chalk.green(moment(fileStats["mtime"]).fromNow())}
    Resource type: ${chalk.green(Helpers.ResourceType(fileStats))}
  `);
};

module.exports = stats;