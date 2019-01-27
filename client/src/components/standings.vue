<template>
  <div class="container">
    <div class="table-responsive">
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
          <tr v-bind:class="setRankingClass(idx)" v-for="(team, idx) in teams" v-bind:key="idx">
            <th scope="row"> {{ team.rank }} </th>
            <td> {{ team.entry_name }} </td>
            <td> {{ team.points_for }} </td>
            <td> {{ team.points_total }} </td>
            <td> {{ team.prize_tl }} </td>
            <td> {{ team.prize_usd }} </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'appcontent',
  components: {
  },
  data() {
    return {
      isLoaded(){
        return true
      },
      isActive: true
    }
  },

  computed: {
    ...mapGetters([
      'teams',
    ]),
  },

  methods: {
    setRankingClass(idx){
      if (idx < 5) {
        return "table-success"
      } else if (idx > 7) {
        return "table-danger"
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
