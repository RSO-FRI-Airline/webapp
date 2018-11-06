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
                                <v-flex xs3><strong>{{flight.departure}}</strong></v-flex>
                                <v-flex><strong>{{flight.origin}}</strong></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="blue" small>
                            <v-layout pt-3>
                                <v-flex xs12><i>{{duration}}</i></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="green" icon="flight_land" >
                            <v-layout pt-3>
                                <v-flex xs3><strong>{{flight.arrival}}</strong></v-flex>
                                <v-flex><strong>{{flight.destination}}</strong></v-flex>
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
                            <v-list-tile-title>Economy fare</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                {{flight.fare | netPrice | euro}}
                            </v-list-tile-avatar>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title>22% VAT</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                {{flight.fare | vatAmount | euro}}
                            </v-list-tile-avatar>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                            <v-list-tile-title><strong>Total</strong></v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-avatar>
                                <strong>{{flight.fare | euro}}</strong>
                            </v-list-tile-avatar>
                        </v-list-tile>
                    </v-list>
                    <v-btn color="success">Buy</v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FlightOption from '../components/FlightOption'

export default {
    computed:{
        duration (){
            var dep = this.flight.departure;
            var arr = this.flight.arrival;
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
            number: "JP1546",
            departure: "20:30",
            arrival: "22:02",
            origin: "Ljubljana",
            destination: "Munich",
            fare: 100,
            firstName: "",
            lastName: "",
            email: ""
        }
  })
};
</script>

<style>
</style>
