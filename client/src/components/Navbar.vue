<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
     <a class="navbar-brand" href="/">Silivri FPL</a>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
           <li class="nav-item">
              <a id="standings" href="#" class="nav-link">Standings <span class="sr-only">(current)</span></a>
           </li>
           <li class="nav-item">
              <a id="results" href="#" class="nav-link">Results<span class="sr-only">(current)</span></a>
           </li>
           <li class="nav-item">
              <a id="fixture" href="#" class="nav-link">Fixture<span class="sr-only">(current)</span></a>
           </li>
        </ul>
     </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
