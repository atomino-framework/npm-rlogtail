#!/usr/bin/env node

const cwd = process.cwd() + "/";

let Rlogtail = require('./src/rlogtail');
let ListenerTcp = require('./src/listener-tcp');
let ListenerUnixSocket = require('./src/listener-unix-socket');
let cfg = require(cwd + 'rlogtail-config.js');

let listener;

if(cfg.connection === 'http'){
	let cfg_address = cfg.address.split(':');
	let address = cfg_address[0];
	let port = cfg_address[1];
	listener = new ListenerTcp(port, address);
}else{
	listener = new ListenerUnixSocket(cfg.address);
}



new Rlogtail(listener, cfg.plugins);