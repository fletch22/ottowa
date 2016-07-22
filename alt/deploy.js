// import client from 'scp2';
import fs from 'fs';
var SshClient = require('ssh2').Client;
import Config from './Config.js';

var conn1 = new SshClient();

console.log(`typeof conn1: ${typeof conn1.connect}`);

var stagingPath = '/home/fletch22/staging';

const ServerDest = Config.LocalVagrant;
// ServerDest.stagingPath = '/home/fletch22/staging';

console.log(fs.readFileSync(ServerDest.privateKeyPath));

// 'rm -r ' + stagingPath + '/*'
var commands = [
  'ls -a'
];

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
conn1.on('ready', function() {
  console.log('Command array execution ready ...');
  // executeCommands();
}).connect({
  host: ServerDest.host,
  username: ServerDest.username,
  port: 2222,
  privateKey: fs.readFileSync(ServerDest.privateKeyPath)
});

// function responseHandler (response) {
//   if (response != null) {
//     console.log(response.message);
//   }
// }
