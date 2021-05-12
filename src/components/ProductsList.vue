<template lang="fr">
    <div>
        <ul id="example-1">
            <li v-for="data in data" :key="data._id">
                <router-link :to="'/product?id=' + data._id">{{ data.name }}</router-link>
            </li>
        </ul>
    </div>
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