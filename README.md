# Logcon
Logcon is an free to use JavaScript library that provides nice console.log output with icons and colors!

NPM: `npm i logcon` [(NPM Package)](https://www.npmjs.com/package/logcon)

Contact Me: https://www.sectly.online/#contact

```js
const logcon = require("logcon");

logcon.warn("This is a warning!");

logcon.error("This is a error!");

logcon.log("This is a log!");

logcon.debug("This is a debug!");

logcon.success("This is a success!");

logcon.stress("This is a stress!");

logcon.info("This is a info!");

logcon.output("This is a output!");
```

New Since 1.0.3: Tables!

```js
const logcon = require("./logcon")

const header = ["Id:", "Name:", "Status:"];
const body = [
  ["#1", "Sectly", "Online", "Working On Stuff"], 
  ["#2", "Mike", "Idle"],
  ["#3", "Dan", "Offline"]
];
 
let newtable = new logcon.Table(header, body);
newtable.log(3); // Colors: 0 = Default, 1 = Red, 2 = Green, 3 = Yellow, 4 = Blue, 5 = Purple, 6 = Dark Blue, 7 = White.

newtable.setHeader(["Id:", "Name:", "Status:"]); // Set Header
newtable.appendBody(["#2", "Mike", "Idle"]); // Append Body
newtable.setBody([["#3", "Dan", "Offline"]]); // Set Body
const tableArray = newtable.array(); // Convert To Array
const tableString = newtable.string(); // Convert To String
newtable.log() // Log In Console, Defaults To The Default Color With No Color Input
newtable.reset(); // Clear/Reset The Table

newtable.reset()
  .setHeader(["Id:", "Name:", "Status:"])
  .appendBody(["#1", "Sectly", "Online", "Working On Stuff"]);

let string = newtable.string();

console.log(string); // Or logcon.debug("Logcon Table:\n" + string);
```
