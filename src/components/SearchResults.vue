<template>
  <ul class="search-section__search-results">
    <li
      v-for="result in results"
      :key="result.id.raw"
      class="search-section__search-result"
    >
      <SearchResult :result="result" />
    </li>
  </ul>
</template>

<script>
import SearchResult from "./SearchResult";

export default {
  components: {
    SearchResult
  },
  props: {
    results: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.search-section__search-results {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.search-section__search-result {
  list-style: none;
  width: 50%;
}
</style>
