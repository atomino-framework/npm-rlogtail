const highlight = require('cli-highlight').highlight;
const Plugin = require('./atomino-plugin');
const chalk = require('chalk');

class Sql extends Plugin {

	label() { return chalk.bgRedBright.black.bold(' TRACE ');}


	format(message) {
		let output = [];
		for (let trace of message.data) {
			output.push(chalk.yellow(trace.file) + " @ " + chalk.yellow.bold(trace.line));
			output.push('↘ ' + chalk.redBright.bold(typeof trace.class !== 'undefined' ? trace.class + ' ' : '') + (typeof trace.type !== 'undefined' ? trace.type + ' ' : '') + chalk.redBright(trace.function));

		}
		return output.join("\n");
	}
}

module.exports = Sql;