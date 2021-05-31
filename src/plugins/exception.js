const highlight = require('cli-highlight').highlight;
const Plugin = require('./atomino-plugin');
const chalk = require('chalk');

class Sql extends Plugin {

	label(message) { return chalk.bgRedBright.black.bold(' ' + message.data.type + ' ');}


	format(message) {
		return (
			chalk.redBright.bold(message.data.message) + "\n" +
			chalk.yellow(message.data.file) + " @ " + chalk.yellow.bold(message.data.line)
		)
	}
}

module.exports = Sql;