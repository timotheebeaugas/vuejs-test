<template>
  <v-app>
    <v-main class="d-flex align-center ma-0">
      <v-app-bar app>
        <router-link to="/" class="text-decoration-none">
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link to="/cart" class="d-flex justify-end text-decoration-none">
          <v-btn icon
            ><v-badge color="green" :content="cartLength">
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </router-link>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { mapState } from "vuex";

export default {
    computed: {
    ...mapState(["cartLength"])
  },
}
</script>
<style lang="css">
</style>