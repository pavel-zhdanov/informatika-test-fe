import Vue from 'vue';
import Vuex from 'vuex';
import goods from './goods';
import stores from './stores';
import movements from './movements';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    goods,
    stores,
    movements,
  },
});
