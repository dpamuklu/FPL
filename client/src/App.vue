<template>
  <div id="app">
    <navbar></navbar>
    <br>
    <standingsTable></standingsTable>
  </div>
</template>

<script>
import Navbar         from './components/Navbar.vue';
import standingsTable from './components/standingsTable.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    standingsTable,
  }
}
</script>

<style>
#app {

}
</style>
