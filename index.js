#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");

const { command } = require("./options/commandFlags");
const { generateTemplate } = require("./generate/templateGeneration");
const { showVersion, showHelpInformation } = require("./helpers");
const { mainFlag, argument } = command.parse(process.argv);

let options = {
  mainFlag,
};

switch (mainFlag) {
  case "--version":
  case "-v":
    // When user runs command "generate -v"
    showVersion();
    break;
  case "--git":
  case "-g":
    // Run command "generate -g <appname>"
    generateTemplate(argument, options);
    break;
  case "--install-dependencies":
  case "-i":
    // Run command "generate -i <appname>"
    generateTemplate(argument, options);
    break;
  case "-h":
    // Run command "generate -h <appname>"
    const optionList = command.showOptions();
    showHelpInformation(optionList);
    break;

  default:
    //Run command "generate <appname>"
    generateTemplate(argument);
    break;
}
