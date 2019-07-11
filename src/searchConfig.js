import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

const connector = new AppSearchAPIConnector({
  searchKey: "search-cmx2y22ucp9ry64mneez4ddj",
  engineName: "hearthstone-cards",
  hostIdentifier: "host-98wz59"
});

const config = {
  debug: true,
  apiConnector: connector,
  searchQuery: {
    disjunctiveFacets: ["cost", "card_class", "set", "type", "race", "rarity"],
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
        type: "value",
        size: 30
      },
      card_class: {
        type: "value"
      },
      cost: {
        type: "range",
        ranges: [
          { from: 0, to: 1, name: "0" },
          { from: 1, to: 2, name: "1" },
          { from: 2, to: 3, name: "2" },
          { from: 3, to: 4, name: "3" },
          { from: 4, to: 5, name: "4" },
          { from: 5, to: 6, name: "5" },
          { from: 6, to: 7, name: "6" },
          { from: 7, to: 8, name: "7" },
          { from: 8, name: "8+" }
        ]
      }
    }
  }
};

export default config;
