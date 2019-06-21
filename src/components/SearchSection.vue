<template>
  <div>SearchSection</div>
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

driver.subscribeToStateChanges(state =>
  console.log(`Received ${state.totalResults} results for your search!`)
);

driver.getActions().setSearchTerm("canyon");
export default {};
</script>
