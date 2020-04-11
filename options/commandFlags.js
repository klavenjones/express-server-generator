const { Command } = require("command-handling");

//Option Definitions
const command = new Command();

command
  .option("-v", "--version", "View installed version")
  .option("-h", "--help", "View help documentation")
  .option("-g", "--git", "Run git init in folder and create repository")
  .option("-i", "--install-dependencies", "Install dependencies");

// switch (mainFlag) {
//   case "-g":
//     // Run command "node example-2.js -g something"
//     if (argument) {
//       console.log("Executing argument \x1b[33m%s\x1b[0m...", argument);
//     }
//     break;
//   case "-v":
//     // Run command "node example-2.js -v"
//     showVersion();
//     break;
//   case "-h":
//     // Run command "node example-2.js -help"
//     const optionList = command.showOptions();
//     showHelpInformation(optionList);
//     break;
//   case "-cf":
//     // Run command "node example-2.js -cf --view-asset --set-asset"
//     if (commandLength > 1 && subFlags.length > 0) {
//       console.log(
//         "Executing config command by sub flag(s) \x1b[33m%s\x1b[0m...",
//         subFlags
//       );
//     }

//     break;

//   default:
//     console.log("Nothing to do! :-)");
//     break;
// }

module.exports = { command };
