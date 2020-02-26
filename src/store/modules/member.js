import router from '../../router'
import http from '@/utils/http.js'
import common from '@/utils/common.js'
import URL from '@/utils/url.js'
import validation from '@/utils/validation.js'
import user from './user'

const state = {
	levelList: ['111'],
	setLevelInfor: {}

};
const getters = {

};

const mutations = {
	setLevel(state, param) {
		state.setLevelInfor = param;
	},
	
};

const actions = {

};

export default {
	state,
	getters,
	actions,
	mutations,
}