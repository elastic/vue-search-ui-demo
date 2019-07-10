<template>
  <div class="sui-layout">
    <SearchHeader v-model="searchInputValue" @submit="handleFormSubmit" />
    <div v-if="searchState.wasSearched" class="sui-layout-body">
      <div class="sui-layout-body__inner">
        <div class="sui-layout-sidebar">
          <SearchSort v-show="thereAreResults" v-model="sortBy" />

          <SearchFacet
            :checked="card_class"
            :facet="searchState.facets.card_class[0]"
            @change="handleFacetChange($event, 'card_class')"
          />

          <SearchFacet
            :checked="artist"
            :facet="searchState.facets.artist[0]"
            @change="handleFacetChange($event, 'artist')"
          />

          <SearchFacet
            :checked="type"
            :facet="searchState.facets.type[0]"
            @change="handleFacetChange($event, 'type')"
          />

          <SearchFacet
            :checked="set"
            :facet="searchState.facets.set[0]"
            @change="handleFacetChange($event, 'set')"
          />

          <SearchFacet
            :checked="race"
            :facet="searchState.facets.race[0]"
            @change="handleFacetChange($event, 'race')"
          />

          <SearchFacet
            :checked="rarity"
            :facet="searchState.facets.rarity[0]"
            @change="handleFacetChange($event, 'rarity')"
          />
        </div>
        <div class="sui-layout-main">
          <div class="sui-layout-main-header">
            <div class="sui-layout-main-header__inner">
              <SearchPagingInfo :search-state="searchState" />
              <SearchResultsPerPage
                v-show="thereAreResults"
                v-model.number="resultsPerPage"
              />
            </div>
          </div>
          <div class="sui-layout-main-body">
            <SearchResults
              v-show="thereAreResults"
              :results="searchState.results"
            />
          </div>
          <div class="sui-layout-main-footer">
            <SearchPagination
              v-show="thereAreResults"
              :total-pages="Math.min(searchState.totalPages, 100)"
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
      race: [],
      rarity: [],
      type: [],
      set: [],
      artist: [],
      card_class: [],
      resultsPerPage: 20,
      sortBy: "relevance"
    };
  },
  computed: {
    thereAreResults() {
      return this.searchState.totalResults && this.searchState.totalResults > 0;
    }
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
    // restoring UI from url query
    this.searchInputValue = driver.getState().searchTerm;
    this.sortBy = driver.getState().sortField;
    this.resultsPerPage = driver.getState().resultsPerPage;
    driver.getState().filters.forEach(filter => {
      this[filter.field] = filter.values;
    });

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
        this[facet].push(value);
        driver.addFilter(facet, value, "any");
      } else {
        this[facet][value] = false;
        const index = this[facet].indexOf(value);
        if (index > -1) {
          this[facet].splice(index, 1);
        }
        driver.removeFilter(facet, value, "any");
      }
    },
    setCurrentPage(page) {
      driver.setCurrent(page);
    }
  }
};
</script>
