<template>
  <div class="search-result">
    <img
      class="search-result__image"
      :src="imageSrc(result.id.raw)"
      :alt="result.name.raw"
    />
    <div>
      <div>Name: {{ result.name.raw }}</div>
      <div>Flavor: {{ result.flavor.raw }}</div>
      <br />
      <div>Class: {{ result.card_class.raw }}</div>
      <div>Type: {{ result.type.raw }}</div>
      <div v-if="result.race">Race: {{ result.race.raw }}</div>
      <div>Set: {{ result.set.raw }}</div>
      <div>Rarity: {{ result.rarity.raw }}</div>
      <br />
      <div>Cost: {{ result.cost.raw }}</div>
      <div v-if="result.attack">Attack: {{ result.attack.raw }}</div>
      <div v-if="result.health">Health: {{ result.health.raw }}</div>
      <br />
      <div>Artist: {{ result.artist.raw }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    imageSrc(id) {
      return `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${id}.png`;
    }
  }
};
</script>

<style scoped>
.search-result {
  display: flex;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  align-items: center;
}

.search-result__image {
  flex: none;
  width: 256px;
}
</style>
