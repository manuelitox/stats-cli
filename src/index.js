const glob = require('glob');
const program = require("commander");

const stats = require("./stats");
const myEmitter = require("./event-emitter");
const generateItems = require("./generate-items");

myEmitter.on('event', filesPath => {
  receiver(filesPath);
});

const receiver = async (filesSystem) => {
  const rootPath = process.cwd();
  let items = await generateItems(filesSystem, rootPath);
  return stats(items.resource, myEmitter);
};

program
  .version('1.0.0')
  .action(() => receiver(glob.sync(`${process.cwd()}/*`)))
  .parse(process.argv);