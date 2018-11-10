/* eslint-disable no-param-reassign,no-underscore-dangle,no-unused-vars */
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3001/',
});
class Goods {
  constructor(goodsName, unit, pack, count, id) {
    this.goodsName = goodsName;
    this.unit = unit;
    this.pack = pack;
    this.count = count;
    this.id = id;
  }
}

export default {
  state: {
    goods: [],
    moveGoods: [],
  },
  mutations: {
    loadGoods(state, payload) {
      state.goods = payload;
    },
    loadMoveGoods(state, payload) {
      state.moveGoods = payload;
    },
    createGoods(state, payload) {
      state.goods.push(payload);
    },
    updateGoods(state, payload) {
      const goods = state.goods.find(item => item.id === payload.id);
      goods.goodsName = payload.goodsName;
      goods.unit = payload.unit;
      goods.pack = payload.pack;
      goods.count = payload.count;
    },
    deleteGoods(state, payload) {
      const goods = state.goods.find(item => item.id === payload.id);
      const indexGoods = state.goods.indexOf(goods);
      state.goods.splice(indexGoods, 1);
    },
  },
  actions: {
    async fetchGoods({ commit }) {
      try {
        const { data } = await axios.get('/api/goods');
        const goods = [];
        data.forEach((item) => {
          goods.push(new Goods(
            item.name,
            item.unit,
            item.pack,
            item.count,
            item.id));
        });
        commit('loadGoods', goods);
      } catch (error) {
        throw error;
      }
    },

    async fetchMoveGoodsById({ commit }, payload) {
      try {
        const { data } = await axios.get(`/api/goods/${payload.id}`);
        const moveGoods = data;
        commit('loadMoveGoods', moveGoods);
      } catch (error) {
        throw error;
      }
    },
    async createGoods({ commit }, payload) {
      try {
        const newGoods = new Goods(
          payload.goodsName,
          payload.unit,
          payload.pack,
          payload.count);
        const { data } = await axios.post('/api/newGoods', newGoods);
        commit('createGoods', {
          ...newGoods,
          id: data.goods.id });
      } catch (error) {
        throw error;
      }
    },
    async updateGoods({ commit }, payload) {
      try {
        await axios.put(`/api/goods/${payload.id}`, {
          ...payload,
        });
        commit('updateGoods', {
          goodsName: payload.goodsName,
          unit: payload.unit,
          pack: payload.pack,
          count: payload.count,
          id: payload.id,
        });
      } catch (error) {
        throw error;
      }
    },
    async deleteGoods({ commit }, payload) {
      try {
        await axios.delete(`/api/goods/${payload.id}`);
        commit('deleteGoods', { id: payload.id });
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    goods(state) {
      return state.goods;
    },
    moveGoods(state) {
      return state.moveGoods;
    },
  },
};
