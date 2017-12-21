class EventBus {
	constructor() {
		this.onObj = {};
	}

	on(method, callback) {
		if (this.onObj[method] === undefined) {
			this.onObj[method] = [];
		}
		if (this.onObj[method].indexOf(callback) === -1) {
			this.onObj[method].push(callback);
		}
	}

	off(method) {
		this.onObj[method] = [];
	}

	trigger(...rest) {
		if (arguments.length === 0) return;
		const key = rest[0];
		const args = [].slice.call(rest, 1);
		if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
			this.onObj[key].forEach((item, index) => {
				this.onObj[key][index].apply(null, args);
			});
		}
		console.log(this.onObj);
	}
}

const eventBus = new EventBus();
export default eventBus;
