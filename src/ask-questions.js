const inquirer = require('inquirer');
const Helpers = require("./helpers");

const askQuestions = filesSystem => { 
  const questions = [
    {
      type: 'list',
      name: 'resource',
      message: 'Select a resource',
      choices: Helpers.formattedFileSystem(filesSystem)
    }
  ];
  return inquirer.prompt(questions);
}

module.exports = askQuestions;