let net = require('net');
let fs = require('fs');
let chalk = require('chalk')

class ListenerUnixSocket {
	constructor(socketfile) {
		this.socketfile = socketfile;
		this.connections = {};
		this.server = null;
		this.handler = (message) => {console.log(message)}
		this.init(socketfile)
		this.shutdown = false;
	}

	init(socketfile) {
		fs.stat(socketfile, (err, stats) => {
			if (err) {} else {
				fs.unlink(socketfile, (err) => {
					if (err) {
						console.error(err);
						process.exit(0);
					}
				});
			}
			this.createServer(socketfile);
		});
	}

	createServer(socketfile) {
		this.server = net.createServer(stream => {
			let client = Date.now();
			let msg = '';
			this.connections[client] = (stream);
			stream.on('end', () => {
				if (msg) this.handler(JSON.parse(msg));
				delete this.connections[client]
			});
			stream.on('data', (message) => msg += message.toString());
		}).listen(socketfile).on('connection', (socket) => {});
	}

	onMessage(handler) { this.handler = handler; }

	getmessage() {
		return chalk.white("listening at: ") + chalk.whiteBright(this.socketfile);
	}

	cleanup() {
		if (!this.shutdown) {
			this.shutdown = true;
			if (Object.keys(this.connections).length) {
				let clients = Object.keys(this.connections);
				while (clients.length) {
					let client = clients.pop();
					this.connections[client].write('__disconnect');
					this.connections[client].end();
				}
			}
			this.server.close();
		}
	}
}

module.exports = ListenerUnixSocket;

