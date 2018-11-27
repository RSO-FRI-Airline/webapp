<template>
    <v-card>
        <v-toolbar dark color="primary">
        <v-toolbar-title>Find flights</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-autocomplete
            v-model="origin"
            :items="airports.map(a => a.city)"
            prepend-icon="flight_takeoff"
            label="Origin" 
            required/>
        <v-autocomplete
            v-model="destination"
            :items="airports.map(a => a.city)"
            prepend-icon="flight_land"
            label="Destination" 
            required/>
        <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
          <v-text-field
              slot="activator"
              v-model="computedDateFormatted"
              label="Date"
              prepend-icon="event"
              readonly/>
          <v-date-picker 
              v-model="date"
              :min="this.addDays(1).toISOString().substr(0, 10)"
              :max="this.addDays(100).toISOString().substr(0, 10)" no-title></v-date-picker>
        </v-menu>
        
        <v-btn color="success" :to="dest">Search</v-btn>
    </v-card-text>
    </v-card>
</template>

<script>
import api from '../api.js'

export default {
  data: (vm) => ({
    airports: [ ],
    origin: null,
    destination: null,
    date: vm.addDays(1).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(vm.addDays(1).toISOString().substr(0, 10))
  }),
  computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      dest (){
          return {name: "results", 
            params: {
                origin: this.airports.find(o => {return o.city === this.origin}), 
                destination: this.airports.find(o => {return o.city === this.destination}), 
                date: this.date,
                dateFormatted: this.dateFormatted
                }
            };
      }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods: {
      addDays (d) {
        var date = new Date();
        date.setDate(date.getDate() + d);
        return date;
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}.${month}.${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('.')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    },
    created() {
      api.get("search", "airports").then(response => {
          this.airports = response.data
      })
      .catch(e => {
          this.errors.push(e)
      })
    }
};
</script>

<style>
</style>
