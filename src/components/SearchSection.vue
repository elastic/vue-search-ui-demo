<template>
  <div class="sui-layout">
    <SearchHeader v-model="searchInputValue" @submit="handleFormSubmit" />
    <div class="sui-layout-body">
      <div class="sui-layout-body__inner">
        <div class="sui-layout-sidebar">
          <SearchFacet
            v-if="searchState.facets && searchState.facets.race"
            :checked="race"
            :facet="searchState.facets.race[0]"
            @change="handleFacetChange($event, 'race')"
          />

          <SearchFacet
            v-if="searchState.facets && searchState.facets.rarity"
            :checked="rarity"
            :facet="searchState.facets.rarity[0]"
            @change="handleFacetChange($event, 'rarity')"
          />
        </div>
        <div class="sui-layout-main">
          <SearchResults
            v-if="searchState.results"
            :results="searchState.results"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui";
import config from "../searchConfig";
import SearchResults from "./SearchResults";
import SearchFacet from "./SearchFacet";
import SearchHeader from "./SearchHeader";

const driver = new SearchDriver(config);

export default {
  components: {
    SearchResults,
    SearchFacet,
    SearchHeader
  },
  data() {
    return {
      searchInputValue: "",
      searchState: {},
      race: {},
      rarity: {}
    };
  },
  mounted() {
    driver.subscribeToStateChanges(state => {
      this.searchState = state;
    });
  },
  methods: {
    handleFormSubmit() {
      driver.getActions().setSearchTerm(this.searchInputValue);
    },
    handleFacetChange(event, facet) {
      const { value, checked } = event.target;
      if (checked) {
        this[facet][value] = true;
        driver.addFilter(facet, value, "any");
      } else {
        this[facet][value] = false;
        driver.removeFilter(facet, value, "any");
      }
    }
  }
};
</script>
