<template lang="">
  <v-container>
  
    <h1 class="h2 text-center grey--text">Your cart</h1>

    <ProductsList v-if="priceEuro" :data="cart" />

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="d-flex justify-center mb-5" v-if="priceEuro">Total: {{priceEuro}}</v-list-item-title>
        <v-list-item-title class="d-flex justify-center mb-5" v-if="!priceEuro">Empty</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          text
          @click="clear"
          :disabled="cart.length == 0"
        >
          Clear
        </v-btn>
        <v-btn
          color="green"
          text
          v-bind="attrs"
          v-on="on"
          :disabled="cart.length == 0"
        >
          Purchase
        </v-btn>
          </template>
          <v-form v-model="valid">
          <v-card>
            <v-card-title>
              <span class="headline">Order form</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      label="First name*"
                      required
                      v-model="firstName"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      label="Last name*"
                      persistent-hint
                      required
                      v-model="lastName"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      label="Adress*"
                      hint="Delivery address"
                      persistent-hint
                      required
                      v-model="address"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      label="City*"
                      persistent-hint
                      required
                      v-model="city"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      :rules="emailRules"
                      required
                      v-model="email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="purchase"
                  :disabled="!valid"
                >
                  Validate
                </v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-dialog>

    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { mapState } from "vuex";
import ProductsList from "@/components/ProductsList.vue";

Vue.use(VueAxios, axios);

export default {
  components: {
    ProductsList: ProductsList
  },
  computed: {
    ...mapState(["cart", "price"])
  },
  data() {
    return {
      priceEuro: null,
      dialog: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      valid: false,
      firstName: null,
      lastName: null,
      address: null,
      city: null,
      email: null,
      products: []
    };
  },
  mounted() {
    if (this.cart.length > 0) {
      this.priceEuro = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
      }).format(this.price / 100);
      this.products = this.cart.map(v => (v._id));
    }
  },
  methods: {
    clear() {
      this.$store.commit("CLEAR_CART");
      this.priceEuro = null;
    },
    purchase() {
      axios({
        method: "post",
        url: process.env.VUE_APP_API_URL + "cameras/order",
        data: {
          contact: {
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            city: this.city,
            email: this.email
          },
          products: this.products
        }
      }).then(
        response => {
          this.$router.push({ path: '/confirmation?id='+ response.data.orderId});
          this.$store.commit("CLEAR_CART");
          this.priceEuro = null;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>
<style lang="">
</style>

