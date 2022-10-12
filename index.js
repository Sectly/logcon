const consoleMessageTypes = [
  "\x1b[30m",
  "\x1b[31m",
  "\x1b[32m",
  "\x1b[33m",
  "\x1b[34m",
  "\x1b[35m",
  "\x1b[36m",
  "\x1b[37m",
  "\x1b[38m",
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
    let outputArg = "";
    const len = args.length;
    for (let i in args) {
      if (i == 0) {
        outputArg += args[i];
      } else {
        outputArg += " " + args[i];
      }
    }
    outputArg = consoleMessageTypes[type] + "[" + consoleMessageIcons[(type - 1)] + "] " + outputArg + consoleMessageTypes[7];
    console.log(outputArg);
  };
};

const color = type => {
  return consoleMessageTypes[type];
}

const icon = type => {
  return consoleMessageIcons[type];
}

const WordWidth = require("./Utils/word-width");

class Table {
  constructor(header = [], body = []) {
    this._updated = true;
    this._stringTable = null;
    this._tableColLength = 0;
    this._maxCols = 0;
    this._tableDatas = null;
    this._wordWidthMap = [];
    this._tableHeader = header;
    this._tableBody = body;
  }

  _fillStr = (l, c) => {
    let str = '';
    let i;
    for (i = 0; i < l; i += 1) {
      str += c;
    }
    return str;
  };

  _initLength = (i, j, str) => {
    this._maxCols = Math.max(j + 1, this._maxCols);

    if (this._tableColLength.length <= j) {
      this._tableColLength.push(0);
    }

    const width = WordWidth(`${str}`);
    while (this._wordWidthMap.length <= i) this._wordWidthMap.push([]);

    if (this._wordWidthMap[i].length <= j) this._wordWidthMap[i].push(width);
    else this._wordWidthMap[i][j] = width;

    this._tableColLength[j] = Math.max(width, this._tableColLength[j]);
  };

  _initDatas = () => {
    this._tableDatas = this._tableBody.concat();
    if (this._tableHeader.length > 0) this._tableDatas.splice(0, 0, this._tableHeader);

    this._tableColLength = [];
    this._maxCols = 0;

    let i;
    let j;
    const rowlen = this._tableDatas.length;
    let rowdata;
    let collen;

    for (i = 0; i < rowlen; i += 1) {
      rowdata = this._tableDatas[i];
      collen = rowdata.length;
      for (j = 0; j < collen; j += 1) {
        this._initLength(i, j, rowdata[j]);
      }
    }
  };

  _drawDivider = (sepWidth) => {
    let i;
    let width;
    let str = '+';
    for (i = 0; i < this._maxCols; i += 1) {
      width = this._tableColLength[i] + sepWidth[i] * 2;
      str += this._fillStr(width, '-');

      str += '+';
    }
    return str;
  };

  _drawLine = (rowdata, sepWidth, index) => {
    let i;
    let str = '|';
    const collen = rowdata.length;
    let temp;
    let left;
    let right;
    for (i = 0; i < this._maxCols; i += 1) {
      if (i >= collen) {
        str += this._fillStr(this._tableColLength[i] + sepWidth[i] * 2, ' ');
        str += '|';
      } else {
        temp = (this._tableColLength[i] - this._wordWidthMap[index][i]) / 2;
        left = Math.floor(temp);
        right = Math.ceil(temp);
        str += this._fillStr(sepWidth[i] + left, ' ');
        str += rowdata[i];
        str += this._fillStr(sepWidth[i] + right, ' ');
        str += '|';
      }
    }
    return str;
  };

  _drawTable = () => {
    let i;
    const sepWidth = [];
    const rowlen = this._tableDatas.length;

    for (i = 0; i < this._maxCols; i += 1) {
      sepWidth.push(Math.ceil(this._tableColLength[i] / 4));
    }

    const divider = this._drawDivider(sepWidth);
    this._stringTable = [divider];

    for (i = 0; i < rowlen; i += 1) {
      this._stringTable.push(this._drawLine(this._tableDatas[i], sepWidth, i));
      this._stringTable.push(divider);
    }
  };

  log = (color) => {
    if (!color || color == 0 || color == "" || color == " ") {
      color = 7;
    }
    
    console.log(consoleMessageTypes[color] + this.array().join('\n') + consoleMessageTypes[7]);
  }

  string = () => this.array().join('\n');

  array = () => {
    if (this._updated) {
      this._initDatas();

      this._drawTable();

      if (this._maxCols === 0) return [];

      this._updated = false;
    }

    return this._stringTable;
  };

  setHeader = (header = []) => {
    this._tableHeader = header;
    this._updated = true;
    return this;
  };

  appendBody = (tr) => {
    this._tableBody.push(tr);
    this._updated = true;
    return this;
  };

  setBody = (body) => {
    this._tableBody = body;
    this._updated = true;
    return this;
  };

  reset = () => {
    this._updated = true;
    this._tableHeader = [];
    this._tableBody = [];
    return this;
  };
}

module.exports = {
  warn: log(3),
  error: log(1),
  log: log(7),
  debug: log(6),
  success: log(2),
  stress: log(5),
  info: log(4),
  output: log(8),
  Table: Table,
  color: color,
  icon: icon,
};
