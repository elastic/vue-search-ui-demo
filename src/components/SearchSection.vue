<template>
  <div>
    <div>
      <form action="" @submit.prevent="handleFormSubmit">
        <input v-model="searchInputValue" type="text" />
      </form>
      <div v-if="searchState.facets && searchState.facets.race">
        Race:
        <div
          v-for="facet in searchState.facets.race[0].data"
          :key="facet.value"
        >
          <label>
            <input
              v-model="races"
              type="checkbox"
              :value="facet.value"
              @change="handleRaceChange"
            />{{ facet.value }}
          </label>
        </div>
      </div>

      <ul v-if="searchState.results" class="search-section__search-results">
        <li
          v-for="result in searchState.results"
          :key="result.id.raw"
          class="search-section__search-result"
        >
          <SearchResult :result="result" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import SearchResult from "./SearchResult";

const connector = new AppSearchAPIConnector({
  searchKey: "search-cmx2y22ucp9ry64mneez4ddj",
  engineName: "hearthstone-cards",
  hostIdentifier: "host-98wz59"
});

const config = {
  debug: true,
  apiConnector: connector,
  disjunctiveFacets: ["race"],
  searchQuery: {
    facets: {
      race: {
        type: "value"
      }
    }
  }
};
const driver = new SearchDriver(config);

export default {
  components: {
    SearchResult
  },
  data() {
    return {
      searchInputValue: "",
      searchState: {},
      races: []
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
    handleRaceChange(event) {
      const { value, checked } = event.target;
      if (checked) {
        driver.getActions().addFilter("race", value, "any");
      } else {
        driver.getActions().removeFilter("race", value, "any");
      }
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
