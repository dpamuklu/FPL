<template>
  <div id="displayOutput" v-show="resultIsReady" class="container-fluid">
     <div class="table-responsive" >
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
                 <th scope="row">   {{ team.rank         }} </th>
                 <td>               {{ team.entry_name   }} </td>
                 <td>               {{ team.points_for   }} </td>
                 <td>               {{ team.points_total }} </td>
                 <td>               {{ team.prize_tl     }} </td>
                 <td>               {{ team.prize_usd    }} </td>
              </tr>
           </tbody>
        </table>
     </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'appcontent',
  data() {
    return {
        league_name: "",
        league_credit_name: "Lapa Kadir Sezonu",
        teams: [],
        resultIsReady: false,
    }
  },
  async created() {
        let response = await axios.get('http://localhost:3000/api/all')
          this.teams = response.data.teams;
          this.league_name = response.data.leage_name;
          this.resultIsReady = true;
      },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
