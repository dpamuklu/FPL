<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Silivri FPL</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mx-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a id="standings" v-on:click="get_standings()" href="#" class="nav-link">Standings <span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a id="results" v-on:click="get_results()" href="#" class="nav-link">Results<span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a id="fixture" v-on:click="get_fixtures()" href="#" class="nav-link">Fixture<span class="sr-only"></span></a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>

import {
  bus
} from '../main';

import {
  mapGetters, mapActions
} from 'vuex';

export default {
  name: 'Navbar',
  props: {},
  methods: {
    ...mapActions([
      'setStandings',
      'setResults',
      'setFixtures'
    ]),
    get_standings: function() {
      this.$store.dispatch('setStandings')
    },
    get_results: function() {
      this.$store.dispatch('setResults')
    },
    get_fixtures: function() {
      this.$store.dispatch('setFixtures')
    },
    refresh_page: function() {
      setTimeout(function() {
        location.reload()
      }, 1000000);
    },
  },
  created() {
    this.refresh_page();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
