<template>
  <div>
    <h5 class="centeralign">
      {{ league_name }}
      <small class="text-muted" v-show="league_name">
        {{ league_credit_name }}
      </small>
    </h5>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'appcontent',
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'league_name',
      'league_credit_name',
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
