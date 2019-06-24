<template>
  <div id="app">
    <SiteHeader />
    <SearchSection />
  </div>
</template>

<script>
import SiteHeader from "./components/SiteHeader.vue";
import SearchSection from "./components/SearchSection.vue";

export default {
  name: "App",
  components: {
    SiteHeader,
    SearchSection
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
