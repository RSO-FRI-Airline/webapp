<template>
    <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs4`]: true }"
              :key="card.id"
            >
              <v-card>
                <v-img src="https://www.globsec.org/wp-content/uploads/2018/02/Vector-Big-City-Graphics.jpg" height="200px"  v-on:click="clicked(card)">
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="card.city"></span>
                        <p class="headline white--text" v-text="card.date"></p>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
</template>

<script>
import api from '../api.js'
import bing from '../bing.js'

export default {
    data: (vm) => ({
        cards: [
        ]
    }),
    computed: {
      
    },
    watch: {
        
    },
    methods: {
        parseDate (date) {
            if (!date) return null

            const [day, month, year] = date.split('.')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        clicked(c){
            this.$router.push({name: "results", 
                params: {
                    origin: {id: "LJLJ", city: "Ljubljana"}, 
                    destination: {id: c.id, city: c.city}, 
                    date: this.parseDate(c.date),
                    dateFormatted: c.date
                }
            });
        }
    },
    created(){
        api.get("recommendation", "recommend").then((d)=>{
          this.cards = d.data;
        })
    }
};
</script>

<style>
</style>
