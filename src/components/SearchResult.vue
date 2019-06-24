<template>
  <div class="search-result">
    <img
      class="search-result__image"
      :src="imageSrc(result.id.raw)"
      :alt="result.name.raw"
    />
    <div>
      <div>Name: {{ result.name.raw }}</div>
      <div v-if="result.flavor">Flavor: {{ result.flavor.raw }}</div>
      <br />
      <div v-if="result.classes">
        Classes: {{ JSON.stringify(result.classes.raw) }}
      </div>
      <div v-else-if="result.card_class">
        Class: {{ result.card_class.raw }}
      </div>
      <div v-if="result.type">Type: {{ result.type.raw }}</div>
      <div v-if="result.race">Race: {{ result.race.raw }}</div>
      <div>Set: {{ result.set.raw }}</div>
      <div>Rarity: {{ result.rarity.raw }}</div>
      <br />
      <div v-if="result.cost">Cost: {{ result.cost.raw }}</div>
      <div v-if="result.attack">Attack: {{ result.attack.raw }}</div>
      <div v-if="result.durability">
        Durability: {{ result.durability.raw }}
      </div>
      <div v-if="result.health">Health: {{ result.health.raw }}</div>
      <div v-if="result.armor">Armor: {{ result.armor.raw }}</div>
      <div v-if="result.spell_damage">
        Spell damage: {{ result.spell_damage.raw }}
      </div>
      <div v-if="result.overload">Overload: {{ result.overload.raw }}</div>
      <br />
      <div v-if="result.artist">Artist: {{ result.artist.raw }}</div>
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
