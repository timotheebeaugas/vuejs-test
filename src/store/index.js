import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    ADD_CAMERA(state, purchase) {
      if(!state.cart.some(camera => camera.name === purchase.name)){
        state.cart.push(purchase)
        console.log(purchase)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
