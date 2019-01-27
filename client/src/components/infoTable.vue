<template>
  <div>
    <leagueHeader></leagueHeader>
    <standings v-if="this.$store.state.standingsIsReady"></standings>
    <results   v-if="this.$store.state.resultsIsReady"></results>
    <fixtures  v-if="this.$store.state.fixtureIsReady"></fixtures>
  </div>
</template>

<script>

import leagueHeader   from './league-header.vue'
import standings      from './standings.vue'
import results        from './results.vue'
import fixtures       from './fixtures.vue'

export default {
  name: 'appcontent',
  components: {
     leagueHeader,
     standings,
     results,
     fixtures,
  },
  data() {
    return {
    }
  },

  computed: {
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
