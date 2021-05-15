<template lang="">
    <v-row class="d-flex justify-center mb-5">
        <v-col 
          cols="11"
          md="6"
        >
        <div> 
            <v-alert
                type="success"
            >Confirmed order: {{order}}</v-alert>
        </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
  data() {
    return {
      order: null
    };
  },
  mounted() {
    this.order = this.$route.query.id;
  }
};
</script>
<style lang="">
</style>