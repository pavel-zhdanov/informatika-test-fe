/* eslint-disable no-param-reassign,no-underscore-dangle,no-unused-vars */
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3001/',
});
class Store {
  constructor(address, specequip, area, id) {
    this.address = address;
    this.specequip = specequip;
    this.area = area;
    this.id = id;
  }
}

export default {
  state: {
    stores: [],
  },
  mutations: {
    loadStores(state, payload) {
      state.stores = payload;
    },
    createStore(state, payload) {
      state.stores.push(payload);
    },
    updateStore(state, payload) {
      const store = state.stores.find(item => item.id === payload.id);
      store.address = payload.address;
      store.specequip = payload.specequip;
      store.area = payload.area;
    },
    deleteStore(state, payload) {
      const store = state.stores.find(item => item.id === payload.id);
      const indexStore = state.stores.indexOf(store);
      state.stores.splice(indexStore, 1);
    },
  },
  actions: {
    async fetchStores({ commit }) {
      try {
        const { data } = await axios.get('/api/stores');
        const stores = [];
        data.forEach((item) => {
          stores.push(new Store(
            item.address,
            item.specequip,
            item.area,
            item.id));
        });
        commit('loadStores', stores);
      } catch (error) {
        throw error;
      }
    },
    async createStore({ commit }, payload) {
      try {
        const newStore = new Store(
          payload.address,
          payload.specequip,
          payload.area);
        const { data } = await axios.post('/api/newStore', newStore);
        commit('createStore', {
          ...newStore,
          id: data.store.id });
      } catch (error) {
        throw error;
      }
    },
    async updateStore({ commit }, payload) {
      try {
        await axios.put(`/api/stores/${payload.id}`, {
          ...payload,
        });
        commit('updateStore', {
          address: payload.address,
          specequip: payload.specequip,
          area: payload.area,
          id: payload.id,
        });
      } catch (error) {
        throw error;
      }
    },
    async deleteStore({ commit }, payload) {
      try {
        await axios.delete(`/api/stores/${payload.id}`);
        commit('deleteStore', { id: payload.id });
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    stores(state) {
      return state.stores;
    },
  },
};
