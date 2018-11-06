<template>
  <v-container>
      <v-card>
        <v-toolbar  dark color="primary">
            <v-toolbar-title>{{$route.params.origin}} - {{$route.params.destination}} {{$route.params.dateFormatted}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="success" to="/">Change</v-btn>
        </v-toolbar>
        <v-card-text>
            <v-progress-linear :indeterminate="true"></v-progress-linear>
            <FlightOption v-for="i in results" :flightOption="i" v-bind:key="i.number"/>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FlightOption from '../components/FlightOption'

export default {
  components: {
      FlightOption
  },
  data: () => ({
      results: [
        {
            number: "JP1543",
            departure: "7:00",
            arrival: "8:30",
            origin: "Ljubljana",
            destination: "Munich",
            fares: [99, 125, 145]
        },
        {
            number: "JP1544",
            departure: "10:00",
            arrival: "11:35",
            origin: "Ljubljana",
            destination: "Munich",
            fares: [85, 120, 140]
        },
        {
            number: "JP1545",
            departure: "15:00",
            arrival: "16:25",
            origin: "Ljubljana",
            destination: "Munich",
            fares: [105, 124, 126]
        },
        {
            number: "JP1546",
            departure: "20:30",
            arrival: "22:02",
            origin: "Ljubljana",
            destination: "Munich",
            fares: [100, 110, 125]
        }
      ]
  })
};
</script>

<style>
</style>
