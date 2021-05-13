<template>
  <v-app>
    <v-content class="d-flex align-center ma-0">
      <v-app-bar app>
        <router-link to="/">
          <v-btn icon>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link to="/cart" class="d-flex justify-end text-decoration-none">
          <v-btn icon>
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </router-link>
      </v-app-bar>
      <router-view />
    </v-content>
  </v-app>
</template>

<style lang="css">

</style>