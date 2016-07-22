'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; // import client from 'scp2';


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Config = require('./Config.js');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SshClient = require('ssh2').Client;


var conn1 = new SshClient();

console.log('typeof conn1: ' + _typeof(conn1.connect));

var stagingPath = '/home/fletch22/staging';

var ServerDest = _Config2.default.LocalVagrant;
// ServerDest.stagingPath = '/home/fletch22/staging';

console.log(_fs2.default.readFileSync(ServerDest.privateKeyPath));

// 'rm -r ' + stagingPath + '/*'
var commands = ['ls -a'];

function deploy() {
  // client.scp('../', `${ServerDest.username}@${ServerDest.host}:${ServerDest.stagingPath}`, responseHandler);
}

var currentCommandIndex = 0;

// function executeCommands() {
//
//   if (currentCommandIndex < commands.length) {
//     conn1.exec(commands[currentCommandIndex], function (err, stream) {
//       if (err) {
//         console.log('Exec error: ' + err);
//         return conn1.end();
//       }
//       stream.on('end', function () {
//         if (currentCommandIndex !== commands.length) {
//           currentCommandIndex++;
//           executeCommands();
//         }
//       }).on('data', function (data) {
//         console.log(data.toString());
//       });
//     });
//   } else {
//     conn1.end(); // close parent (and this) connection
//
//     console.log('.. Command array execution finished.');
//     console.log('Beginning deploy ...');
//     deploy();
//     console.log('... Deploy complete.');
//   }
// }
//
conn1.on('ready', function () {
  console.log('Command array execution ready ...');
  // executeCommands();
}).connect({
  host: ServerDest.host,
  username: ServerDest.username,
  port: 2222,
  privateKey: _fs2.default.readFileSync(ServerDest.privateKeyPath)
});

// function responseHandler (response) {
//   if (response != null) {
//     console.log(response.message);
//   }
// }