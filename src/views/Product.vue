<template lang="fr">
    <div>
        {{product.name}}
        {{product.description}}
        {{product.imageUrl}}
        {{product.price}}
        <ul id="example-1">
            <li v-for="lense in product.lenses" :key="product.id">
                {{ lense }}
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  data(){
    return{
      product: []
    }
  },
  mounted() {
    Vue.axios.get(process.env.VUE_APP_API_URL+'cameras/'+this.$route.query.id).then((response) => {
      this.product = response.data;
    })
  },
}
</script>

<style lang="">
    
</style>