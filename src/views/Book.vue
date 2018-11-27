<template>
  <v-container>

    <v-dialog v-model="dialog" width="500" >
      <v-card>
        <v-card-title class="headline success lighten-2" primary-title >
          Booking completed
        </v-card-title>
        <v-card-text>You have successfully booked your flight!</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" flat to="/" >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog" width="500" >
      <v-card>
        <v-card-title class="headline error lighten-2" primary-title >
          Booking error
        </v-card-title>
        <v-card-text>Something is wrong with your booking!</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="errorDialog = false" >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
            return Math.round((parseFloat(value)*0.22)*100)/100;
        },
        netPrice: function (value) {
            var d = parseFloat(value);
            return Math.round((d - (d*0.22))*100)/100;
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
        },
        dialog: false,
        errorDialog: false
  }),
  methods: {
      buy: function (){
        var d = {
            customer: {
                firstname: this.flight.firstName,
                lastname: this.flight.lastName,
                mail: this.flight.email
            },
            token: this.$route.params.prices[this.$route.params.ticketClass].id
        };
        console.log(JSON.stringify(d));
        console.log(d)
        //api.post("book", )
        if(d.customer.firstname != "" && d.customer.lastname != "" && d.customer.mail != ""){
            api.post("booking", "book", d).then(response => {
                this.dialog = true;
            }).catch(err =>{
                this.errorDialog = true;
            });
        }else {
            this.errorDialog = true;
        }
      }
  }
};
</script>

<style>
</style>
