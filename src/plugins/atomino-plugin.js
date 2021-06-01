const chalk = require('chalk');
const Plugin = require('../plugin');

class AtominoPlugin extends Plugin{
	header(message) {
		return this.label(message) +' '+ chalk.white(message.header.time)
	}
}

module.exports = AtominoPlugin;
