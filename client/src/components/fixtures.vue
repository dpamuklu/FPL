<template>
<div ref="displayFixture" v-show="this.$store.state.fixtureIsReady" class="container">
  <leagueHeader></leagueHeader>
  <table class="table">
    <b>Fixtures</b>
    <br />
    <tbody>
      <br />
      <tr v-for="(fixture, idx) in fixtures" v-bind:key="idx">
        <td class="text-center"> {{ fixture.entry_1_name   }} </td>
        <td class="text-center"> v </td>
        <td class="text-center"> {{ fixture.entry_2_name    }} </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import leagueHeader from './league-header.vue'

export default {
  name: 'appcontent',
  components: {
    leagueHeader
  },
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'fixtures'
    ]),
  },

  methods: {
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
