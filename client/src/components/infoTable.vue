<template>
<div>
  <div ref="displayStandings" v-show="this.$store.state.standingsIsReady" class="container">
    <div class="table-responsive">
      <h5 class="centeralign">
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
          <tr v-for="(team, idx) in teams" v-bind:key="idx">
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

  <div ref="displayResults" v-show="this.$store.state.resultsIsReady" class="container">
    <table class="table">
      <b>Matchups</b>
      <br />
      <tbody><br />
        <tr v-for="(result, idx) in results" v-bind:key="idx">
          <td class="text-center"> {{ result.entry_1_name   }} </td>
          <td class="text-center"> {{ result.entry_1_points   }} </td>
          <td class="text-center"> {{ result.entry_2_points }} </td>
          <td class="text-center"> {{ result.entry_2_name    }} </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div ref="displayFixture" v-show="this.$store.state.fixtureIsReady" class="container">
    <table class="table">
      <b>Fixtures</b>
      <br />
      <tbody><br />
        <tr v-for="(fixture, idx) in fixtures" v-bind:key="idx">
          <td class="text-center"> {{ fixture.entry_1_name   }} </td>
          <td class="text-center"> v </td>
          <td class="text-center"> {{ fixture.entry_2_name    }} </td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
import {
  mapGetters
} from 'vuex';

export default {
  name: 'appcontent',
  data() {
    return {
      isLoading: true
    }
  },

  computed: {
    ...mapGetters([
      'fplInfos',
      'league_name',
      'league_credit_name',
      'teams',
      'results',
      'fixtures'
    ]),
  },

  methods: {
    ...mapActions([
      'getFplInfos',
      'setStandings',
      'setFixtures',
      'setResults'
    ])
  },

  async created() {
    this.$store.dispatch('getFplInfos')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.centeralign {
  text-align: center;
}

.table {
  margin-top: 2rem
}
</style>
