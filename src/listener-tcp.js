const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const chalk = require('chalk');

class ListenerTcp {
	constructor(port = 8881, address = '127.0.0.1') {
		this.port = port;
		this.address = address;
		this.handler = (message) => {console.log(message)}
		app.use(bodyParser.json({limit: '10mb', extended: true}))
		app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
		app.use(bodyParser.json());
		app.use('/', (req, res) => {
			this.handler(req.body);
			res.send('.');
		});
		let server = app.listen(port, address);
	}

	getmessage(){
		return chalk.white("listening at: ") +
			chalk.whiteBright(this.address) +
			chalk.white(':'+this.port+' ');
	}

	cleanup() {}

	onMessage(handler) { this.handler = handler; }
}

module.exports = ListenerTcp;