import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

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
      },
      rarity: {
        type: "value"
      },
      type: {
        type: "value"
      },
      set: {
        type: "value"
      },
      artist: {
        type: "value"
      },
      card_class: {
        type: "value"
      }
    }
  }
};

export default config;
