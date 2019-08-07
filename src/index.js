const glob = require('glob');
const program = require("commander");

const stats = require("./stats");
const myEmitter = require("./event-emitter");
const askQuestions = require("./ask-questions");

myEmitter.on('event', filesPath => {
  receiver(filesPath);
});


const receiver = async (filesSystem) => {
  const answers = await askQuestions(filesSystem);
  return stats(answers.resource, myEmitter);
};

program
  .version('1.0.0')
  .action(() => receiver(glob.sync(`${process.cwd()}/*`)))
  .parse(process.argv);