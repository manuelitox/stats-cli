import glob from 'glob';
import program from 'commander';
import pkg from '../package.json';

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
  .version(pkg.version)
  .action(() => receiver(glob.sync(`${process.cwd()}/*`)))
  .parse(process.argv);
