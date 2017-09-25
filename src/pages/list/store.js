import { observable, action, runInAction, computed, autorun } from 'mobx';
import axios from 'axios';

class ListStore {
	@observable listData = null;

	constructor() {
		autorun(() => {
			if (!this.listData) {
				this.getListData(1)
			}
		})
	}

	async getListData(number) {
		const data = await axios.get('/api/get', {
			params: {
				id: number,
			}
		});
		runInAction('fetch data', () => {
			this.listData = data;
		})
	}
}

const store = new ListStore();
export default store;
