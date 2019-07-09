<template>
  <div class="sui-layout">
    <SearchHeader v-model="searchInputValue" @submit="handleFormSubmit" />
    <div class="sui-layout-body">
      <div class="sui-layout-body__inner">
        <div class="sui-layout-sidebar">
          <SearchSort v-model="sortBy" />

          <SearchFacet
            v-if="searchState.facets && searchState.facets.card_class"
            :checked="card_class"
            :facet="searchState.facets.card_class[0]"
            @change="handleFacetChange($event, 'card_class')"
          />

          <SearchFacet
            v-if="searchState.facets && searchState.facets.artist"
            :checked="artist"
            :facet="searchState.facets.artist[0]"
            @change="handleFacetChange($event, 'artist')"
          />

          <SearchFacet
            v-if="searchState.facets && searchState.facets.type"
            :checked="type"
            :facet="searchState.facets.type[0]"
            @change="handleFacetChange($event, 'type')"
          />

          <SearchFacet
            v-if="searchState.facets && searchState.facets.set"
            :checked="set"
            :facet="searchState.facets.set[0]"
            @change="handleFacetChange($event, 'set')"
          />

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
          <div class="sui-layout-main-header">
            <div class="sui-layout-main-header__inner">
              <SearchPagingInfo :search-state="searchState" />
              <SearchResultsPerPage v-model.number="resultsPerPage" />
            </div>
          </div>
          <div class="sui-layout-main-body">
            <SearchResults
              v-if="searchState.results"
              :results="searchState.results"
            />
          </div>
          <div class="sui-layout-main-footer">
            <SearchPagination
              :total-pages="searchState.totalPages"
              :click-handler="setCurrentPage"
            />
          </div>
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
import SearchPagingInfo from "./SearchPagingInfo";
import SearchPagination from "./SearchPagination";
import SearchSort from "./SearchSort";
import SearchResultsPerPage from "./SearchResultsPerPage";

const driver = new SearchDriver(config);

export default {
  components: {
    SearchResults,
    SearchFacet,
    SearchHeader,
    SearchPagingInfo,
    SearchPagination,
    SearchSort,
    SearchResultsPerPage
  },
  data() {
    return {
      searchInputValue: "",
      searchState: {},
      race: {},
      rarity: {},
      type: {},
      set: {},
      artist: {},
      card_class: {},
      resultsPerPage: 20,
      sortBy: "relevance"
    };
  },
  watch: {
    resultsPerPage(newResultsPerPage) {
      driver.setResultsPerPage(newResultsPerPage);
    },
    sortBy(newSortBy) {
      const sortBy = newSortBy === "relevance" ? "" : newSortBy;
      driver.setSort(sortBy, "asc");
    }
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
    },
    setCurrentPage(page) {
      driver.setCurrent(page);
    }
  }
};
</script>
