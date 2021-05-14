<template lang="">
    <div>
        {{cart}}
        <router-link to="/confirmation">valider</router-link>
    </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { mapState } from "vuex";

Vue.use(VueAxios, axios);

export default {
  computed: {
    ...mapState(["cart"])
  },
  data() {
    return {};
  }
};
</script>
<style lang="">
</style>

