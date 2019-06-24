<template>
  <div>
    <div>SearchSection</div>
    <div>
      <form action="" @submit.prevent="handleFormSubmit">
        <input v-model="searchInputValue" type="text" />
      </form>
      <ul>
        <li v-for="result in searchState.results" :key="result.id.raw">
          <img
            :src="imageSrc(result.id.raw)"
            :alt="result.name.raw"
            width="256"
          />
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

const config = { apiConnector: connector };
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
  computed: {
    imageSrc(id) {
      return `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png`;
    }
  },
  mounted() {
    driver.subscribeToStateChanges(state => {
      console.log(`Received ${state.totalResults} results for your search!`);
      this.searchState = state;
    });
  },
  methods: {
    handleFormSubmit() {
      driver.getActions().setSearchTerm(this.searchInputValue);
    }
  }
};
</script>
