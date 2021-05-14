<template>
  <div class="home">
      <h1 class="text-center display-3">Orinoco</h1>
      <h2 class="text-center grey--text">Vintage cameras</h2>
    <ProductsList :data="products" />
  </div>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  components: {
    'ProductsList': ProductsList,
  },
  data(){
    return{
      products: []
    }
  },
  mounted() {
    Vue.axios.get(process.env.VUE_APP_API_URL+'cameras').then((response) => {
      this.products = response.data;
    })
  },
}
</script>