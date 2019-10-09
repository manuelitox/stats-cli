import glob from 'glob';
import program from 'commander';

import stats from './stats';
import myEmitter from './event-emitter';
import generateItems from './generate-items';

const receiver = async filesSystem => {
  const rootPath = process.cwd();
  const items = await generateItems(filesSystem, rootPath);
  return stats(items.resource, myEmitter);
};

myEmitter.on('event', filesPath => {
  receiver(filesPath);
});

program
  .version('1.0.0')
  .action(() => receiver(glob.sync(`${process.cwd()}/*`)))
  .parse(process.argv);
