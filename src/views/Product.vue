<template lang="fr">
  <v-container>
      <v-card
        class="mx-auto"
        max-width="400"
      >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="product.imageUrl"
    >
      <v-card-title elevation="5" class="shadow">{{product.name}}</v-card-title>
    </v-img>

      <v-card-subtitle class="pb-0 orange--text">
        {{price}}
      </v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{product.description}}</div>
      </v-card-text>

    <form>
      <v-card-text class="text--primary pb-0 body-2">      
        <v-select
          v-model="select"
          :items="product.lenses"
          label="Lense"
          required
          dense
          class="body-2"
        ></v-select>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="green"
          text
          @click="validate"
          :disabled="!select"
        >
          Buy
        </v-btn>
      </v-card-actions>      
    </form>
  </v-card>
    <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      product: [],
      price: "",
      select: null,
      snackbar: false,
      text: `Added to Basket`
    };
  },
  mounted() {
    Vue.axios
      .get(process.env.VUE_APP_API_URL + "cameras/" + this.$route.query.id)
      .then(response => {
        this.product = response.data;
        this.price = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR"
        }).format(response.data.price / 100);
        this.select = response.data.lenses[0];
      });
  },
  methods: {
    validate() {
      this.$store.commit("ADD_CAMERA", {
        _id: this.product._id,
        name: this.product.name,
        description: this.select,
        price: this.product.price,
        imageUrl: this.product.imageUrl
      });
      this.snackbar = true;
    }
  }
};
</script>

<style lang="css">
.shadow {
  text-shadow: 1px 1px 1px rgb(114, 114, 114);
}
</style>