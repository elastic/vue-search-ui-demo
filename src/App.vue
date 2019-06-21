<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <SiteHeader />
    <SearchSection />
  </div>
</template>

<script>
import SiteHeader from "./components/SiteHeader.vue";
import SearchSection from "./components/SearchSection.vue";

export default {
  name: "app",
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
  text-align: center;
  color: #2c3e50;
}
</style>
