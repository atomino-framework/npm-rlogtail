const highlight = require('cli-highlight').highlight;
const Plugin = require('./atomino-plugin');
const chalk = require('chalk');
class Sql extends Plugin{

	label() { return chalk.bgRedBright.black.bold(' SQL ERROR ');}

	format(message) {
		return (
			highlight(message.data.sql, {language:'sql', ignoreIllegals: true}) + "\n" +
			chalk.red.bold(message.data.error)
		);
	}

}

module.exports = Sql;