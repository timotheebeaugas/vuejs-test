<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    Vue.axios.get(process.env.VUE_APP_URL+'cameras').then((response) => {
      console.log(response.data)
})
  },
}
</script>
