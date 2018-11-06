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
    </v-layout>
  </v-container>
</template>

<script>
import FindFlights from '../components/FindFlights'

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
