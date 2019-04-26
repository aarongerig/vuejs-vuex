import shop from '../api/shop';

export default { // = methods
  fetchProducts ({ commit }) {
    return new Promise((resolve) => {
      shop.getProducts((products) => {
        commit('setProducts', products)
        resolve()
      })
    })
  },

  addProductToCart ({ state, getters, commit }, product) {
    if (getters.productIsInStock(product)) {
      const cartItem = state.cart.find(item => item.id === product.id)

      if (!cartItem) {
        commit('pushProductToCart', product.id)
      } else {
        commit('incrementItemQuantity', cartItem)
      }

      commit('decrementProductInventory', product)
    }
  },

  checkout ({ commit, state }) {
    shop.buyProducts(state.cart, () => {
      commit('emptyCart')
      commit('setCheckoutStatus', 'success')
    }, () => {
      commit('setCheckoutStatus', 'fail')
    })
  }
}