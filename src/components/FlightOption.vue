<template>
  <v-container>
      <v-card>
        <h3>Flight {{flightOption.number}}</h3>
        <v-card-text>
            <v-layout>
                <v-flex xs3>
                    <v-timeline align-top dense >
                        <v-timeline-item color="red" icon="flight_takeoff">
                            <v-layout pt-3>
                                <v-flex xs3><strong>{{flightOption.departure}}</strong></v-flex>
                                <v-flex><strong>{{flightOption.origin}}</strong></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="blue" small>
                            <v-layout pt-3>
                                <v-flex xs12><i>{{duration}}</i></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="green" icon="flight_land" >
                            <v-layout pt-3>
                                <v-flex xs3><strong>{{flightOption.arrival}}</strong></v-flex>
                                <v-flex><strong>{{flightOption.destination}}</strong></v-flex>
                            </v-layout>
                        </v-timeline-item>
                    </v-timeline>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">{{flightOption.fares[0]}} €</div>
                            <span>Economy</span><br />
                            <span class="grey--text">Hand baggage included</span><br />
                            <span class="grey--text">No checked luggage</span><br />
                            <span class="grey--text">No meal included</span><br />
                        </div>
                        </v-card-title>
                        <v-card-actions> <v-btn color="success" to="/book">Select</v-btn> </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">{{flightOption.fares[1]}} €</div>
                            <span>Standard</span><br />
                            <span class="grey--text">Hand baggage</span><br />
                            <span class="grey--text">Checked luggage (max 20 kg)</span><br />
                            <span class="grey--text">Welcome drink</span><br />
                        </div>
                        </v-card-title>
                        <v-card-actions> <v-btn color="success" to="/book">Select</v-btn> </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">{{flightOption.fares[2]}} €</div>
                            <span>Premium</span><br />
                            <span class="grey--text">Hand baggage</span><br />
                            <span class="grey--text">Checked luggage (max 35 kg)</span><br />
                            <span class="grey--text">Meals and drinks included</span><br />
                        </div>
                        </v-card-title>
                        <v-card-actions> <v-btn color="success" to="/book">Select</v-btn> </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import FindFlights from '../components/FindFlights'

export default {
    computed:{
        duration (){
            var dep = this.flightOption.departure;
            var arr = this.flightOption.arrival;
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
  components: {
  },
  data: () => ({
  }),
  props: ['flightOption']
};
</script>

<style>
</style>
