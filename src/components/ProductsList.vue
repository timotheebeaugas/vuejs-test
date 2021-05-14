<template>
  <v-container>
    <v-list rounded class="d-flex justify-center">
      <v-list-item-group color="primary">
        <v-list-item v-for="(data, i) in data" :key="i">
          <v-list-item-avatar>
            <v-img :src="data.imageUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <router-link :to="'/product?id=' + data._id" class="text-decoration-none black--text">
              <v-list-item-title v-text="data.name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.description"></v-list-item-subtitle>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>
<script>
export default {
  name: "ProductsList",
  props: {
    data: Array
  }
};
</script>
<style lang="css">

</style>