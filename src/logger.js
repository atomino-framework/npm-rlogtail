class Logger {
	constructor(plugins) {
		this.plugins = plugins;
	}
	log(message) {
		for (let plugin of this.plugins) if (plugin.channel === message.channel && plugin.state) plugin.log(message);
	}
}

module.exports = Logger;

