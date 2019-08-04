const fs = require("fs");
const glob = require('glob');
const moment = require("moment");

const Helpers = require("./helpers");

const stats = (pathResolved, myEmitter) => {
  const fileStats = fs.statSync(pathResolved);

  if (Helpers.ResourceType(fileStats) === 'directory') {
    const filesPath = glob.sync(`${pathResolved}/*`);
    myEmitter.emit('event', filesPath);
  } else {
    console.log("size", `${fileStats["size"]} bytes`)
  }

  console.log("last modify time:", moment(fileStats["mtime"]).fromNow());  
  console.log('Resource type:', Helpers.ResourceType(fileStats));
};

module.exports = stats;