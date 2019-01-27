<template>
  <div class="container">
    <table class="table">
      <b>Matchups</b>
      <br />
      <tbody><br />
        <tr v-for="(result, idx) in results" v-bind:key="idx">
          <td class="text-center"> <span v-bind:class="{ 'table-success': result.entry_1_win == 1 }"> {{ result.entry_1_name   }}  </span></td>
          <td class="text-center"> {{ result.entry_1_points   }} </td>
          <td class="text-center"> {{ result.entry_2_points }}   </td>
          <td class="text-center"> <span v-bind:class="{ 'table-success': result.entry_2_win == 1}"> {{ result.entry_2_name   }} </span></td>
        </tr>
      </tbody>
    </table>
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
      isWinner: "",
    }
  },
  computed: {
    ...mapGetters([
      'results'
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
