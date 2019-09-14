import fs from "fs";
import glob from "glob";
import chalk from "chalk";
import moment from "moment";

import {resourceType} from "./helpers";

const stats = (pathResolved, myEmitter) => {
  const fileStats = fs.statSync(pathResolved);

  if (resourceType(fileStats) === "directory") {
    const filesPath = glob.sync(`${pathResolved}/*`);
    return myEmitter.emit("event", filesPath);
  }

  console.log(`
  
    Information:
    ___________________________________________________

    Size: ${chalk.green(`${fileStats["size"]} bytes`)}
    Last modify time: ${chalk.green(moment(fileStats["mtime"]).fromNow())}
    Resource type: ${chalk.green(resourceType(fileStats))}
  `);
};

export default stats;