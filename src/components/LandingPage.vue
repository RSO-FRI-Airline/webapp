<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="500px"
            :src="require('../assets/ljubljana.jpg')" >
            <v-container fill-height fluid>
              <v-layout fill-height align-center>
                <v-flex md7 align-end></v-flex>
                <v-flex md4 xs12>
                  <FindFlights />
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
      </v-card>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FindFlights from './FindFlights'

export default {
  components: {
    FindFlights
  },
  data: () => ({
  })
};
</script>

<style>
</style>
