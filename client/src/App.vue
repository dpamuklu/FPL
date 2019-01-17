<template>
  <div id="app">
    <navbar></navbar>
    <br>
    <infoTable></infoTable>
  </div>
</template>

<script>
import Navbar         from './components/Navbar.vue';
import infoTable from './components/infoTable.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    infoTable,
  }
}
</script>

<style>
#app {

}
</style>
