<template>
<div>
  <navbar></navbar>
  <br>
  <infoTable></infoTable>
</div>
</template>

<script>
import Navbar from './Navbar.vue';
import infoTable from './infoTable.vue';

export default {
  name: 'mainPage',
  components: {
    Navbar,
    infoTable,
  }
}
</script>
