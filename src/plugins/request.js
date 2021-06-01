const highlight = require('cli-highlight').highlight;
const Plugin = require('./atomino-plugin');
const chalk = require('chalk');

class Dump extends Plugin {

	label(message) { return chalk.bgMagentaBright.whiteBright(' REQUEST ') + chalk.whiteBright.bgMagenta.bold(' ' + message.data.method + ' ');}

	header(message) {
		return super.header(message) + ' ' +
			chalk.bold(message.data.runtime) + ' ' +
			chalk.cyan(message.data.host) +
			chalk.cyanBright.bold(message.data.path) +
			(message.data.query ? chalk.white('?') + chalk.yellow(message.data.query) : '')
	}

	format(message) { return null;}
}

module.exports = Dump;