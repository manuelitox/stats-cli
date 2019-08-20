const inquirer = require('inquirer');

const Helpers = require("./helpers");

const generateItems = (filesSystem, rootPath) => { 
  let choices = Helpers.formattedFileSystem(filesSystem);
  choices = Helpers.generateBackToRoot(choices, rootPath);
  const questions = [
    {
      type: 'list',
      name: 'resource',
      message: 'Select a resource',
      choices
    }
  ];
  return inquirer.prompt(questions);
}

module.exports = generateItems;