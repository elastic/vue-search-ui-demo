<template>
  <div>
    <div>SearchSection</div>
    <div>
      <form action="" @submit.prevent="handleFormSubmit">
        <input type="text" v-model="searchInputValue" />
      </form>
      <ul>
        <li v-for="result in searchState.results" :key="result.card_id.raw">
          <img
            :src="result.img.raw"
            alt=""
            v-if="result.img && result.img.raw"
          />
          {{ JSON.stringify(result) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SearchDriver } from "@elastic/search-ui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

const connector = new AppSearchAPIConnector({
  searchKey: "search-cmx2y22ucp9ry64mneez4ddj",
  engineName: "hearthstone-cards",
  hostIdentifier: "host-98wz59"
});

const config = {
  apiConnector: connector
};

const driver = new SearchDriver(config);

export default {
  data() {
    return {
      searchInputValue: "",
      searchState: {
        results: []
      }
    };
  },
  computed: {},
  methods: {
    handleFormSubmit() {
      driver.getActions().setSearchTerm(this.searchInputValue);
    }
  },
  mounted() {
    driver.subscribeToStateChanges(state => {
      console.log(`Received ${state.totalResults} results for your search!`);
      this.searchState = state;
    });
  }
};
</script>
