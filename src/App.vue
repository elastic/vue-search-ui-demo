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

<style src="@elastic/react-search-ui-views/lib/styles/styles.css"></style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
</style>
