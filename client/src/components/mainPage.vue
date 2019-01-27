<template>
  <div>
    <navbar></navbar>
    <br>
    <infoTable></infoTable>
  </div>
</template>

<script>
import Navbar         from './Navbar.vue'
import infoTable      from './infoTable.vue'
import { mapActions } from 'vuex'

export default {
  name: 'mainPage',
  components: {
    Navbar,
    infoTable,
  },
  methods: {
    ...mapActions([
      'getFplInfos',
    ])
  },
  async created() {
    this.$store.dispatch('getFplInfos')
  },
}
</script>
