<template>
    <v-card>
        <v-toolbar dark color="primary">
        <v-toolbar-title>Find flights</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-autocomplete
            v-model="origin"
            :items="airports"
            prepend-icon="flight_takeoff"
            label="Origin" />
        <v-autocomplete
            v-model="destination"
            :items="airports"
            prepend-icon="flight_land"
            label="Destination" />
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
        <v-date-picker v-model="date"></v-date-picker>
        </v-menu>
        <v-btn color="success">Search</v-btn>
    </v-card-text>
    </v-card>
</template>

<script>
export default {
  data: (vm) => ({
    airports: [
      "Ljubljana",
      "Vienna",
      "Munich",
      "Frankfurt",
      "Istanbul",
      "Podgorica",
      "Priština",
      "Belgrade"
    ],
    origin: null,
    destination: null,
    date: null,
    dateFormatted: null
  }),
  computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods: {
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
    }
};
</script>

<style>
</style>
