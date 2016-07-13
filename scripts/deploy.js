// var client = require('scp2');
//
// var SshClient = require('ssh2').Client;
//
// var conn1 = new SshClient();
// var host = '104.236.252.246';
// var stagingPath = '/home/fletch22/staging';
// var username = 'fletch22';
// var password = 'iwaglmlah';
//
// var commands = [
//   'rm -r ' + stagingPath + '/*'
// ];
//
// function deploy() {
//   client.scp('../', username + ':' + password + '@' + host + ':' + stagingPath, responseHandler);
// }
// var currentCommandIndex = 0;
//
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
//
//   }
//
// }
// conn1.on('ready', function() {
//   console.log('Command array execution ready ...');
//   executeCommands();
// }).connect({
//   host: host,
//   username: username,
//   password: password
// });
//
// function responseHandler (response) {
//   if (response != null) {
//     console.log(response.message);
//   }
// }
//
// // NOTE: Code for downloading files.
// // client.scp('fletch22:iwaglmlah@104.236.252.246:~/docker-builds/node/src/*.js', './remoteNodeSrc/', responseHandler);
//
// // function callback(response) {
// //
// //   // console.log(response.path);
// //   //
// //   // if (response && typeof response.path !== 'undefined') {
// //   //   console.log(response.path);
// //   // }
// //
// //   for (key in response) {
// //     console.log(key);
// //   }
// //
// //   client.close();
// // }
// //
// // // NOTE: Switch to private key?
// // client.defaults({
// //   port: 22,
// //   host: '104.236.252.246',
// //   username: 'fletch22',
// //   password: 'iwaglmlah'
// // });
// //
// // client.on('ready', function() {
// //   console.log('Transfer beginning... ');
// // }).on('end', function() {
// //   console.log(' ... Transfer ended');
// // }).download('/home/fletch22/docker-builds/node/src/readme.txt', './remoteNodeSrc/readme.txt', callback);
