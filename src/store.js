import Vue from 'vue';
import Vuex from 'vuex';
import shop from './api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data
    products: [],
  },

  getters: { // = computed properties
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
    },
  },

  actions: { // = methods
    fetchProducts({ commit }) {
      return new Promise((resolve) => {
        shop.getProducts((products) => {
          commit('setProducts', products);
          resolve();
        });
      });
    },
  },

  mutations: { // = single state changes
    // update products
    setProducts(state, products) {
      state.products = products;
    },
  },
});
