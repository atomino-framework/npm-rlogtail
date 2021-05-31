const Logger = require('./logger');
const term = require('terminal-kit').terminal;
const chalk = require('chalk');
const readline = require('readline');
const inquirer = require('inquirer');


class Rlogtail {

	updateBottomBar() {
		let bottombar = '';
		let bottombarstring = '';
		for (let plugin of this.plugins) {
			let ink = (plugin.state ? chalk.ansi256(45) : chalk.ansi256(27));
			bottombar += ink.bgAnsi256(17)(' ' + plugin.hotkey + ' ') + ink.bgAnsi256(19)(' ' + plugin.name + ' ');
			bottombarstring += ' ' + plugin.hotkey + ' ' + ' ' + plugin.name + ' ';
		}
		bottombar += chalk.bgAnsi256(17)(' '.repeat(term.width - bottombarstring.length))
		this.output.updateBottomBar(bottombar);
	}

	clear() {
		this.output.log.write(chalk.cyanBright.bold(' RLOGTAIL ') + this.listener.getmessage());
		for (let i = 0; i < term.height - 2; i++) this.output.log.write('');
	}

	constructor(listener, plugins) {
		this.plugins = plugins;
		this.listener = listener;
		this.output = new inquirer.ui.BottomBar();
		for (let plugin of this.plugins) plugin.output = this.output;

		readline.emitKeypressEvents(process.stdin);
		process.stdin.setRawMode(true);
		process.stdin.on('keypress', (str, key) => {
			for (let plugin of this.plugins) {
				if (key.name === plugin.hotkey) {
					plugin.state = !plugin.state;
					this.updateBottomBar();
				}
			}
			if (key.name === 'backspace') this.clear();
		});

		process.on('SIGINT', ()=>{
			console.log('bye')
			this.listener.cleanup()
			process.exit();
		});

		this.clear();
		this.updateBottomBar();

		this.listener = listener;
		this.listener.onMessage((message) => this.logger.log(message));
		this.logger = new Logger(plugins);
	}
}

module.exports = Rlogtail;