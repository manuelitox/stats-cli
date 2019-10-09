import inquirer from 'inquirer';

import { formattedFileSystem, generateBackToRoot } from './helpers';

const generateItems = (fileSystem, rootPath) => {
  if (!fileSystem) return 'fileSystem is undefined';
  if (!Array.isArray(fileSystem)) return 'fileSystem has to be an array';
  if (!rootPath) return 'rootPath is undefined';
  if (typeof rootPath !== 'string') return 'rootPath has to be a string';

  let choices = formattedFileSystem(fileSystem);
  choices = generateBackToRoot(choices, rootPath);
  const questions = [
    {
      type: 'list',
      name: 'resource',
      message: 'Select a resource',
      choices,
    },
  ];
  return inquirer.prompt(questions);
};

export default generateItems;
