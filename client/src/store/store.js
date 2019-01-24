import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,

  state: {
    fpl_infos: {
      teams: [],
      fixtures: [],
      results: [],
      league_name: "",
      league_credit_name: "Lapa Kadir Sezonu"
    },
    standingsIsReady: false,
    resultsIsReady: false,
    fixtureIsReady: false
  },

  getters: {
    teams(state) {
      return state.fpl_infos.teams
    },
    fixtures(state) {
      return state.fpl_infos.fixtures
    },
    results(state) {
      return state.fpl_infos.results
    },
    league_credit_name(state) {
      return state.fpl_infos.league_credit_name
    },
    league_name(state) {
      return state.fpl_infos.league_name
    },
  },

  mutations: {

    setStandings: (state) => {
      state.resultsIsReady = false
      state.standingsIsReady = true
      state.fixtureIsReady  = false
    },
    setResults: (state) => {
      state.resultsIsReady = true
      state.standingsIsReady = false
      state.fixtureIsReady = false
    },
    setFixtures: (state) => {
      state.resultsIsReady = false
      state.standingsIsReady = false
      state.fixtureIsReady = true
    },
    setFplInfos: (state, response)  => {
      state.fpl_infos.teams = response.data.teams;
      state.fpl_infos.league_name = response.data.league_name;
      state.fpl_infos.fixtures = response.data.fixture;
      state.fpl_infos.results = response.data.results;
    }
  },

  actions: {
    setStandings: (context) => {
      context.commit('setStandings')
    },
    setResults: (context) => {
      context.commit('setResults')
    },
    setFixtures: (context) => {
      context.commit('setFixtures')
    },
    getFplInfos: async function(context) {
      let response = await axios.get('http://localhost:3000/api/all')

      context.commit('setFplInfos', response)
      context.commit('setStandings')
    }
  }

});
