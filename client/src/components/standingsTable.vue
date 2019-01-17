<template>
<div>
  <div ref="displayStandings" v-show="standingsIsReady" class="container-fluid">
    <div class="table-responsive">
      <h5>
        {{ league_name }}
        <small class="text-muted">
          {{ league_credit_name }}
        </small>
      </h5>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Takim</th>
            <th scope="col">Toplam Skor</th>
            <th scope="col">Puan</th>
            <th scope="col">Ödül(TL)</th>
            <th scope="col">Ödül($)</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="team in teams">
            <th scope="row"> {{ team.rank         }} </th>
            <td> {{ team.entry_name   }} </td>
            <td> {{ team.points_for   }} </td>
            <td> {{ team.points_total }} </td>
            <td> {{ team.prize_tl     }} </td>
            <td> {{ team.prize_usd    }} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div ref="displayResults" v-show="resultsIsReady" class="container-fluid">
  </div>

  <div ref="displayFixture" v-show="fixtureIsReady" class="container-fluid">
  </div>

</div>
</template>

<script>
import axios from 'axios';
import {
  bus
} from '../main';

export default {
  name: 'appcontent',
  data() {
    return {
      league_name: "",
      league_credit_name: "Lapa Kadir Sezonu",
      teams: [],
      fixture: [],
      results: [],
      standingsIsReady: false,
      resultsIsReady: false,
      fixtureIsReady: false,
    }
  },

  methods: {
    setStandings: function() {
      this.resultsIsReady = false;
      this.standingsIsReady = true;
      this.fixtureIsReady = false;
    },
    setResults: function() {
      this.$refs.displayResults.innerHTML =
        "Results is to be displayed here!";
      this.resultsIsReady = true;
      this.standingsIsReady = false;
      this.fixtureIsReady = false;
    },
    setFixtures: function() {
      this.$refs.displayFixture.innerHTML =
        "Fixture is to be displayed here!";
      this.resultsIsReady = false;
      this.standingsIsReady = false;
      this.fixtureIsReady = true;
    },
  },

  async created() {
    let response = await axios.get('http://localhost:3000/api/all')
    this.teams = response.data.teams;
    this.league_name = response.data.leage_name;
    this.fixture = response.data.fixture;
    this.results = response.data.results;

    this.standingsIsReady = true;

    bus.$on('setStandings', () => {
      this.setStandings();
    });

    bus.$on('setResults', () => {
      console.log('bus on  set results');
      this.setResults();
    });

    bus.$on('setFixtures', () => {
      this.setFixtures();
    });
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
