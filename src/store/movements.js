/* eslint-disable no-param-reassign,no-underscore-dangle,no-unused-vars */
import Axios from 'axios';
import config from '../config';

const axios = Axios.create({
  baseURL: config.server,
});
class Move {
  constructor(goodsName, address, importtime, exporttime, id) {
    this.goodsName = goodsName;
    this.address = address;
    this.importtime = importtime.split('T')[0];
    this.exporttime = exporttime ? exporttime.split('T')[0] : '';
    this.id = id;
  }
}

export default {
  state: {
    moves: [],
  },
  mutations: {
    loadMoves(state, payload) {
      state.moves = payload;
    },
    createMove(state, payload) {
      state.moves.push(payload);
    },
    updateMove(state, payload) {
      const move = state.moves.find(item => item.id === payload.id);
      move.goodsName = payload.goodsName;
      move.address = payload.address;
      move.importtime = payload.importtime;
      move.exporttime = payload.exporttime;
    },
    deleteMove(state, payload) {
      const move = state.moves.find(item => item.id === payload.id);
      const indexMove = state.moves.indexOf(move);
      state.moves.splice(indexMove, 1);
    },
  },
  actions: {
    async fetchMoves({ commit }) {
      try {
        const { data } = await axios.get('/api/moves');
        const moves = [];
        data.forEach((item) => {
          moves.push(new Move(
            item.name,
            item.address,
            item.importtime,
            item.exporttime,
            item.id));
        });
        commit('loadMoves', moves);
      } catch (error) {
        throw error;
      }
    },
    async createMove({ commit, getters }, payload) {
      try {
        const newMove = {
          goodsid: getters.getGoodsByName(payload.goodsName).id,
          storeid: getters.getStoreByAddress(payload.address).id,
          importtime: payload.importtime,
          exporttime: payload.exporttime,
        };
        const { data } = await axios.post('/api/newMove', newMove);
        commit('createMove', {
          goodsName: payload.goodsName,
          address: payload.address,
          importtime: payload.importtime,
          exporttime: payload.exporttime,
          id: data.move.id });
      } catch (error) {
        throw error;
      }
    },
    async updateMove({ commit, getters }, payload) {
      try {
        const updMove = {
          id: payload.id,
          goodsid: getters.getGoodsByName(payload.goodsName).id,
          storeid: getters.getStoreByAddress(payload.address).id,
          importtime: payload.importtime,
          exporttime: payload.exporttime,
        };
        await axios.put(`/api/moves/${payload.id}`, {
          ...updMove,
        });
        commit('updateMove', {
          goodsName: payload.goodsName,
          address: payload.address,
          importtime: payload.importtime,
          exporttime: payload.exporttime,
          id: payload.id,
        });
      } catch (error) {
        throw error;
      }
    },

    async deleteMove({ commit }, payload) {
      try {
        await axios.delete(`/api/moves/${payload.id}`);
        commit('deleteMove', { id: payload.id });
      } catch (error) {
        throw error;
      }
    },
  },
  getters: {
    moves(state) {
      return state.moves;
    },
  },
};
