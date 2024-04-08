import { createStore } from 'vuex'

export default createStore({
	state(){
		return {
			islogined: true
		}
	},
	mutations: {
		logined(state, islogined){
			state.islogined = islogined;
		}
	}
})