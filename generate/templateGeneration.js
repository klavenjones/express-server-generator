const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const { command } = require("../options/commandFlags");
const helpers = require("../helpers");

const {
  createDirectoryContents,
  gitInstallation,
  dependencyInstallation,
} = helpers;

const templatePath = path.join(`${__dirname}`, "../templates");

const CHOICES = fs.readdirSync(templatePath);
const CURRENT_DIRECTORY = process.cwd();

exports.generateTemplate = (inputProjectName, options) => {
  const { mainFlag } = options;
  //This will be the questions asked when a user run's the generate
  const choiceList = [
    {
      name: "projectChoice",
      type: "list",
      message: "What project template would you like to generate?",
      choices: CHOICES,
    },
    {
      name: "projectName",
      type: "input",
      message: "Project name:",
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else
          return "Project name may only include letters, numbers, underscores and hashes.";
      },
      default: "app",
    },
  ];

  let QUESTIONS = [];

  //If a user has chosen a command name via the command line then they wont be asked to name the generated folder
  inputProjectName
    ? (QUESTIONS = choiceList.slice(0, 1)) // Project name already exists therefor we don't ask again
    : (QUESTIONS = choiceList); // Project name is null therefor we must have two questions

  inquirer.prompt(QUESTIONS).then((answers) => {
    const { projectChoice, projectName } = answers;
    const chosenTemplatePath = `${templatePath}/${projectChoice}`;
    const chosenProjectName = inputProjectName ? inputProjectName : projectName;
    const newProjectPath = `${CURRENT_DIRECTORY}/${chosenProjectName}`;

    fs.mkdirSync(newProjectPath);
    createDirectoryContents(chosenTemplatePath, chosenProjectName);
    if (mainFlag === "-g" || mainFlag === "--git") {
      gitInstallation(chosenProjectName);
    }

    if (mainFlag === "-i" || mainFlag === "--install-dependencies") {
      dependencyInstallation(chosenProjectName);
    }
  });
};
