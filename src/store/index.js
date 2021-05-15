import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    cartLength: "0",
    price: null
  },
  mutations: {
    ADD_CAMERA(state, purchase) {
      if(!state.cart.some(camera => camera.name === purchase.name && camera.description === purchase.description)){
        state.cart.push(purchase);
        state.price = state.price + purchase.price;
        state.cartLength = state.cart.length;
      }
    },
    CLEAR_CART(state) {
        state.cart = [];
        state.cartLength = "0";
    },
  },
  actions: {
  },
  modules: {
  }
})
