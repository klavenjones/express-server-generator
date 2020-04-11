const CURRENT_DIRECTORY = process.cwd();
const fs = require("fs");

module.exports = helpers = {
  showVersion,
  showHelpInformation,
  createDirectoryContents,
  dependencyInstallation,
  gitInstallation,
};

//Command Line Helpers
function showVersion() {
  console.log("Version 1.0.0");
}

function showHelpInformation(optionList) {
  let textOptions = "";
  let textSubOptions = "";

  optionList.map((option) => {
    textOptions += `${option.flag}, \x1b[90m${option.alias}\x1b[0m\t${option.description}\n`;

    if (option.subFlags.length > 0) {
      option.subFlags.map((subFlag, index) => {
        if (index === 0) {
          textSubOptions += `${option.flag}`;
        }

        textSubOptions += `\t\x1b[90m${subFlag.flag}\x1b[0m\t${subFlag.description}\n`;
      });
    }
  });

  console.log("\nOPTIONS:");
  console.log(textOptions);
}

function createDirectoryContents(templatePath, newProjectFolderName) {
  const filesToCreate = fs
    .readdirSync(templatePath)
    .filter((file) => file !== ".DS_Store");

  filesToCreate.forEach((file) => {
    // console.log(file);
    const origFilePath = `${templatePath}/${file}`;
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");
      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${CURRENT_DIRECTORY}/${newProjectFolderName}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIRECTORY}/${newProjectFolderName}/${file}`);

      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectFolderName}/${file}`
      );
    }
    const projectName = newProjectFolderName;
    return projectName;
  });
}

function dependencyInstallation(project) {
  if (!project) {
    console.log("You need an Missing the project variable");
  }

  console.log("\nInstalling dependencies...");
  const exec = require("child_process").exec;
  exec(`cd ${project} && yarn install`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n\x1b[32mDone!\x1b[0m npm ${stdout}`);
    if (!stdout) {
      console.log(`\x1b[35mInformation\x1b[0m: ${stderr}`);
    }
  });
  return true;
}

function gitInstallation(project) {
  if (!project) {
    console.log("You need an Missing the project variable");
  }
  console.log("\nRunning the git init command...");
  const exec = require("child_process").exec;
  exec(`cd ${project} && git init`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n\x1b[32mDone!\x1b[0m npm ${stdout}`);

    if (!stdout) {
      console.log(`\x1b[35mInformation\x1b[0m: ${stderr}`);
    }
  });

  return true;
}
