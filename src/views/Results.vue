<template>
  <v-container>
      <v-card>
        <v-toolbar  dark color="primary">
            <v-toolbar-title>{{$route.params.origin.city}} - {{$route.params.destination.city}} {{$route.params.dateFormatted}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="success" to="/">Change</v-btn>
        </v-toolbar>
        <v-card-text>
            <v-progress-linear :indeterminate="true" v-if="isLoading"></v-progress-linear>
            <FlightOption v-for="i in results" :flightOption="i" v-bind:key="i.number"/>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FlightOption from '../components/FlightOption'
import api from '../api.js'

export default {
  components: {
      FlightOption
  },
  data: () => ({
      isLoading: true,
      results: [ ]
  }),
  created() {
    api.post("search", this.$route.params).then(response => {
      this.isLoading = false;
      this.results = response.data;
    })
    .catch(e => {
      this.isLoading = false;
      this.errors.push(e);
    })
  }
};
</script>

<style>
</style>
