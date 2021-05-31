const highlight = require('cli-highlight').highlight;
const Plugin = require('./atomino-plugin');
const chalk = require('chalk');
class Sql extends Plugin{

	label() { return chalk.bgYellowBright.black.bold(' SQL ');}

	format(message) {
		return highlight(message.data, {language:'sql', ignoreIllegals: true})
	}
}

module.exports = Sql;