const consoleMessageTypes = [
  "\x1b[30m",
  "\x1b[31m",
  "\x1b[32m",
  "\x1b[33m",
  "\x1b[34m",
  "\x1b[35m",
  "\x1b[36m",
  "\x1b[37m",
  "\x1b[38m"
];

const consoleMessageIcons = [
  "×",
  "√",
  "‼",
  "i",
  "⟫",
  "»",
  ">",
  "?",
  "›"
];

const log = type => {
  return (...args) => {
    let outputArg = '';
    const len = args.length;
    for (let i in args) {
      if (i == 0) {
        outputArg += args[i];
      } else {
        outputArg += ' ' + args[i];
      }
    }
    outputArg = consoleMessageTypes[type] + "[" + consoleMessageIcons[(type - 1)] + "] " + outputArg + consoleMessageTypes[7];
    console.log(outputArg);
  };
};

const table = type => {
  return (...args) => {
    let outputArg = '';
    const len = args.length;
    for (let i in args) {
      if (i == 0) {
        outputArg += args[i];
      } else {
        outputArg += ' ' + args[i];
      }
    }
    outputArg = consoleMessageTypes[type] + "[" + consoleMessageIcons[(type - 1)] + "] " + outputArg + consoleMessageTypes[7];
    console.log(outputArg);
  };
};

module.exports = {
  warn: log(3),
  error: log(1),
  log: log(7),
  debug: log(6),
  success: log(2),
  stress: log(5),
  info: log(4),
  output: log(8),
  table: table
};
