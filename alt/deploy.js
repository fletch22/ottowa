import scp2 from 'scp2';
import { Client } from 'scp2';
var SshClient = require('ssh2').Client;
import Config from './Config.js';
import moment from 'moment';
import 'moment-precise-range-plugin';
import { Spinner } from 'cli-spinner';
import path from 'path';
import tarPack from 'tar-pack';
import fs from 'fs';
import { Promise } from 'es6-promise';
import del from 'delete';
import mkdirp from 'mkdirp';
import process from 'process';
// import fsStream from 'fs-stream';

const sshConfig = Config.ServerInfo.SshConfig.LocalVagrant;

function deploy() {

  return new Promise((resolve, reject) => {

    console.log(process.cwd());

    const projectPath = '/Users/fletch22/workspaces/fletch22Website';

    const loadingDockDir = path.join(projectPath, 'build/loading-dock/');
    const shippingPackagePath = path.join(loadingDockDir, 'f22website');
    const tarPath = path.join(loadingDockDir, 'f22website.tar');

    console.log(tarPath);

    del.sync(shippingPackagePath);
    del.sync(tarPath);

    // mkdirp.sync(shippingPackagePath);
    // tarPack(require("fstream-npm")(projectPath), [options]);

    var write = fs.createWriteStream;

    tarPack.pack(projectPath)
      .pipe(fs.createWriteStream(tarPath))
      .on('error', (error) => {
        console.log(error.stack);
      })
      .on('close', () => {

        // tarPack.unpack(shippingPackagePath, (error) => {
        //   if (error) {
        //     console.log(error.stack);
        //     reject(error);
        //   } else {
        //     console.log("Done unpacking.");
        //   }
        // }).on('close', () => {
        //   console.log('Unpacking finished.');
        // })

        // fs.createReadStream(tarPath)
        // .on('close', () => {
        //   console.log("Copied distributable files to loading dock folder. Ready for transport!");

          const start = moment();

          let spinner = new Spinner('Connecting %s    ');
          spinner.setSpinnerString(0);
          spinner.start();

          console.log('Beginning deploy ...');

          const client = new Client(sshConfig);

          client.on('connect', () => {
            spinner.stop(true);
            console.log('SCP Connected.');
            spinner = new Spinner('Deploying files %s        ');
            spinner.setSpinnerString(18);
            spinner.start();
          });

          client.on('read', (src) => {
            console.log('Read fired.');
          });

          client.on('error', (error) => {
            console.log("Encountered error.");
            console.log(error.message);

            reject(error);
          });

          client.on('close', () => {
            spinner.stop(true);
            const end = moment();

            console.log('Closing connection.');
            console.log(`Deploy operation took ${moment.preciseDiff(start, end)}.`);

            resolve();
          });

          console.log(`Preparing to SCP '${loadingDockDir}' to '${sshConfig.path}'.`);
          scp2.scp(loadingDockDir, sshConfig, client, responseHandler);
        // });
    });
  });
}

function executeCommands(commands, currentCommandIndex) {

  return new Promise((resolve, reject) => {
    rawCommandExecution(commands, currentCommandIndex, resolve, reject);
  });

}

function rawCommandExecution(commands, currentCommandIndex, resolve, reject) {
  if (currentCommandIndex < commands.length) {
    conn1.exec(commands[currentCommandIndex], (err, stream) => {
      console.log(commands[currentCommandIndex]);
      if (err) {
        console.log('Exec error: ' + err);
        conn1.end();
        reject();
      }
      stream.on('end', () => {
        if (currentCommandIndex !== commands.length) {
          rawCommandExecution(commands, ++currentCommandIndex, resolve, reject);
        }
      }).on('data', (data) => {
        console.log(`STDOUT: ${data}`);
      }).stderr.on('data', (data) => {
        console.log(`STDERR: ${data}`);
      });
    });
  } else {
    console.log('.. Command array execution finished.');
    resolve();
  }
}

var conn1 = new SshClient();
conn1.on('ready', function() {
  console.log('Command array execution ready ...');

  let commands = [
    `sudo chown -R f22 ${sshConfig.loadingDockPath}`,
    `rm -rf ${sshConfig.loadingDockPath}`,
    `mkdir -p ${sshConfig.path}`
  ];

  executeCommands(commands, 0).then(() => {
    deploy().then(() => {
      // conn1.end(); // close parent (and this) connection

      const dockerPath = path.join(sshConfig.path, 'docker');
      const buildScriptPath = path.join(dockerPath, 'build.sh');
      const runScriptPath = path.join(dockerPath, 'run.sh');

      const destTarPath = path.join(sshConfig.path, 'f22website.tar');

      commands = [
        `cd ${sshConfig.path} && tar -xf ${destTarPath}`,
        'cd fletch22Website',
        'docker stop $(docker ps -a -q)',
        'docker rmi -f f22website',
        `cd ${dockerPath} && source ./build.sh`,
        `cd ${dockerPath} && source ./run.sh`
      ];

      // 'docker stop $(docker ps -a -q)',
      // 'docker rmi -f f22website',
      // `cd ${dockerPath} && source ./build.sh`,
      // `cd ${dockerPath} && source ./run.sh`

      executeCommands(commands, 0).then(() => {
        conn1.end(); // close parent (and this) connection
      });
    });
  })

}).on('error', (error) => {
  console.log(`Error: ${error.level}: ${error.message}`);
  console.log('');
}).on('end', () => {

}).connect(sshConfig);

function responseHandler (response) {
  if (response) {
    console.log(response.message);
  }
}
