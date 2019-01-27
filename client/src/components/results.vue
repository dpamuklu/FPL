<template>
  <div ref="displayResults" v-show="this.$store.state.resultsIsReady" class="container">
    <leagueHeader></leagueHeader>
    <table class="table">
      <b>Matchups</b>
      <br />
      <tbody><br />
        <tr v-for="(result, idx) in results" v-bind="setWinner(result)" v-bind:key="idx">
          <td class="text-center"> <span v-bind:class="{ 'table-success': isWinner == 'teamOne' }"> {{ result.entry_1_name   }}  </span></td>
          <td class="text-center"> {{ result.entry_1_points   }} </td>
          <td class="text-center"> {{ result.entry_2_points }}   </td>
          <td class="text-center"> <span v-bind:class="{ 'table-success': isWinner == 'teamTwo' }"> {{ result.entry_2_name   }} </span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import leagueHeader   from './league-header.vue'

export default {
  name: 'appcontent',
  components: {
    leagueHeader
  },
  data() {
    return {
      isWinner: ""
    }
  },
  computed: {
    ...mapGetters([
      'results',
      'league_name'
    ]),
  },
  methods: {
    setWinner(result){
      this.isWinner = ""
      if ( result.entry_1_points > result.entry_2_points) {
         this.isWinner = "teamOne"
      } else if (result.entry_2_points > result.entry_1_points){
         this.isWinner = "teamTwo"
      }
    }
  },
  created() {
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
