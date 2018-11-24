<template>
  <v-container>
      <v-card>
        <v-toolbar  dark color="primary">
            <v-toolbar-title>Flight information</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-layout>
                <v-flex xs3 class="pa-3">
                    <v-timeline align-top dense >
                        <v-timeline-item color="red" icon="flight_takeoff">
                            <v-layout pt-3>
                                <v-flex xs3><strong>{{$route.params.schedule.start_time.substring(0, 5)}}</strong></v-flex>
                                <v-flex><strong>{{$route.params.schedule.origin.city}}</strong></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="blue" small>
                            <v-layout pt-3>
                                <v-flex xs12><i>{{duration}}</i></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="green" icon="flight_land" >
                            <v-layout pt-3>
                                <v-flex xs3><strong>{{$route.params.schedule.end_time.substring(0, 5)}}</strong></v-flex>
                                <v-flex><strong>{{$route.params.schedule.destination.city}}</strong></v-flex>
                            </v-layout>
                        </v-timeline-item>
                    </v-timeline>
                </v-flex>
                <v-flex xs5 class="pa-3">
                    <h2>Personal information</h2>
                    <v-form>
                        <v-text-field
                            v-model="flight.firstName"
                            label="First name"
                            required
                            ></v-text-field>
                        <v-text-field
                            v-model="flight.lastName"
                            label="Last name"
                            required
                            ></v-text-field>
                        <v-text-field
                            v-model="flight.email"
                            label="E-mail"
                            required
                            ></v-text-field>
                    </v-form>
                </v-flex>
                <v-flex xs4 class="pa-3">
                    <h2>Price breakdown</h2>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>{{(["Economy", "Business", "Premium"])[$route.params.ticketClass]}} fare</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                {{$route.params.prices[$route.params.ticketClass].price | netPrice | euro}}
                            </v-list-tile-avatar>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>22% VAT</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                {{$route.params.prices[$route.params.ticketClass].price | vatAmount | euro}}
                            </v-list-tile-avatar>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title><strong>Total</strong></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                <strong>{{$route.params.prices[$route.params.ticketClass].price | euro}}</strong>
                            </v-list-tile-avatar>
                        </v-list-tile>
                    </v-list>
                    <v-btn color="success" v-on:click="buy">Buy</v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FlightOption from '../components/FlightOption'
import api from '../api.js'

export default {
    computed:{
        duration (){
            var dep = this.$route.params.schedule.start_time;
            var arr = this.$route.params.schedule.end_time;
            var d = dep.split(':');
            var a = arr.split(':');
            var h = parseInt(a[0]) - parseInt(d[0]);
            var min = parseInt(a[1]) - parseInt(d[1]);
            while(min < 0){
                h--;
                min += 60;
            }
            while(min > 60){
                h++;
                min -= 60;
            }
            return h+"h "+min+"min";
        }
    },
    filters: {
        vatAmount: function (value) {
            return (parseFloat(value)*0.22);
        },
        netPrice: function (value) {
            var d = parseFloat(value);
            return d - (d*0.22);
        },
        euro: function (value){
            return value + "€";
        }
    },
  components: {
      FlightOption
  },
  data: () => ({
      flight:
        {
            firstName: "",
            lastName: "",
            email: ""
        }
  }),
  methods: {
      buy: function (){
          var d = {
            firstName: this.flight.firstName,
            lastName: this.flight.lastName,
            email: this.flight.email,
            ticketClass: this.$route.params.ticketClass,
            flight: this.$route.params.schedule.id,
            date: this.$route.params.date,
            price: this.$route.params.prices[this.$route.params.ticketClass]
        };
        console.log(JSON.stringify(d));
        console.log(d)
        //api.post("book", )
      }
  }
};
</script>

<style>
</style>
