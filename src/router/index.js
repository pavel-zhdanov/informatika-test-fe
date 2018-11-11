import Vue from 'vue';
import Router from 'vue-router';
import GoodsTable from '../components/GoodsTable';
import StoresTable from '../components/StoresTable';
import MovementTable from '../components/MovementTable';
import Home from '../components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/goods', name: 'goodsTable', component: GoodsTable },
    { path: '/stores', name: 'storesTable', component: StoresTable },
    { path: '/movement', name: 'movementTable', component: MovementTable },
    { path: '/', name: 'home', component: Home },
  ],
  mode: 'history',
});
