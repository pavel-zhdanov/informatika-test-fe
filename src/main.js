import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';
import store from './store/index';

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created() {
    this.$store.dispatch('fetchGoods');
    this.$store.dispatch('fetchStores');
    this.$store.dispatch('fetchMoves');
  },
});
