'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {
  LocalVagrant: {
    host: '127.0.0.1',
    port: '2222',
    username: 'vagrant',
    privateKeyPath: '/Users/fletch22/.ssh/id_rsa'
  },
  DigitalOcean: {
    host: '104.236.252.246',
    port: '22',
    username: 'fletch22',
    password: 'iwaglmlah'
  }
};

exports.default = Config;