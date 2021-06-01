const term = require('terminal-kit').terminal;
const padleft = require('pad-left');
const chalk = require('chalk');

class Plugin {
	constructor(channel, hotkey, name, state = true) {
		this.channel = channel;
		this.hotkey = hotkey;
		this.state = state;
		this.name = name;
	}

	log(message) {
		this.output.log.write(chalk.underline.ansi256(236)(' '.repeat(term.width)))
		this.output.writeLog(this.header(message))
		let formattedMessage = this.format(message);
		if (formattedMessage) this.output.writeLog(formattedMessage)
	}

	header(message) {
		let timestamp = new Date();
		return this.label(message) +
			chalk.bgAnsi256(232)(
				chalk.gray(' ' +
					padleft(timestamp.getHours(), 2, '0') + ':' +
					padleft(timestamp.getMinutes(), 2, '0') + ':' +
					padleft(timestamp.getSeconds(), 2, '0') + ' ')
			);
	}
	label(message) { return this.channel;}
	format(message) { return JSON.stringify(message);}
}

module.exports = Plugin;
