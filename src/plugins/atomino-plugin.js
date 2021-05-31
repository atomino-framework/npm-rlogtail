const chalk = require('chalk');
const Plugin = require('../plugin');

class AtominoPlugin extends Plugin{
	header(message) {
		return super.header(message) +
		chalk.green.bold(message.header.request.method) + ' ' +
		chalk.white(message.header.request.host)  +
		chalk.cyan(message.header.request.path)
	}
}

module.exports = AtominoPlugin;
