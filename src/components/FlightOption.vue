<template>
  <v-container>
      <v-card>
        <h3>Flight {{flightOption.schedule.id}} | {{flightOption.schedule.airplane.name}}</h3>
        <v-card-text>
            <v-layout>
                <v-flex xs3>
                    <v-timeline align-top dense >
                        <v-timeline-item color="red" icon="flight_takeoff">
                            <v-layout pt-3>
                                <v-flex xs3><strong>{{flightOption.schedule.start_time.substring(0, 5)}}</strong></v-flex>
                                <v-flex><strong>{{flightOption.schedule.origin.city}}</strong></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="blue" small>
                            <v-layout pt-3>
                                <v-flex xs12><i>{{duration}}</i></v-flex>
                            </v-layout>
                        </v-timeline-item>
                        <v-timeline-item color="green" icon="flight_land" >
                            <v-layout pt-3>
                                <v-flex xs3><strong>{{flightOption.schedule.end_time.substring(0, 5)}}</strong></v-flex>
                                <v-flex><strong>{{flightOption.schedule.destination.city}}</strong></v-flex>
                            </v-layout>
                        </v-timeline-item>
                    </v-timeline>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">{{flightOption.prices[0].price}} €</div>
                            <span>Economy</span><br />
                            <span class="grey--text">Hand baggage included</span><br />
                            <span class="grey--text">No checked luggage</span><br />
                            <span class="grey--text">No meal included</span><br />
                        </div>
                        </v-card-title>
                        <v-card-actions> <v-btn color="success" :to="dest(0)">Select</v-btn> </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">{{flightOption.prices[1].price}} €</div>
                            <span>Standard</span><br />
                            <span class="grey--text">Hand baggage</span><br />
                            <span class="grey--text">Checked luggage (max 20 kg)</span><br />
                            <span class="grey--text">Welcome drink</span><br />
                        </div>
                        </v-card-title>
                        <v-card-actions> <v-btn color="success" :to="dest(1)">Select</v-btn> </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs3>
                    <v-card>
                        <v-card-title primary-title>
                        <div>
                            <div class="headline">{{flightOption.prices[2].price}} €</div>
                            <span>Premium</span><br />
                            <span class="grey--text">Hand baggage</span><br />
                            <span class="grey--text">Checked luggage (max 35 kg)</span><br />
                            <span class="grey--text">Meals and drinks included</span><br />
                        </div>
                        </v-card-title>
                        <v-card-actions> <v-btn color="success" :to="dest(2)">Select</v-btn> </v-card-actions>
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
            var dep = this.flightOption.schedule.start_time;
            var arr = this.flightOption.schedule.end_time;
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
    methods: {
        dest (ticketClass){
            return {name: "book", 
                params: {
                    schedule: this.flightOption.schedule,
                    prices: this.flightOption.prices,
                    ticketClass: ticketClass,
                    date: this.$route.params.date
                }
            };
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
