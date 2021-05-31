const highlight = require('cli-highlight').highlight;
const Plugin = require('./atomino-plugin');
const chalk = require('chalk');

class Dump extends Plugin {

	label() { return chalk.bgCyanBright.black.bold(' DUMP ');}

	format(message) {
		return highlight(
			typeof message.data === 'object' ? JSON.stringify(message.data, null, 2) : message.data,
			{language: 'json', ignoreIllegals: true}
		);
	}
}

module.exports = Dump;