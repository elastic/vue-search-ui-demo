<template>
  <div>
    {{ facet.field }}
    <div v-for="facetItem in facet.data" :key="facetItem.value">
      <label>
        <input
          type="checkbox"
          :value="facetItem.value"
          :checked="isChecked(facetItem.value)"
          @change="$emit('change', $event)"
        />
        {{ facetItem.value }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    facet: {
      type: Object,
      required: true
    },
    checked: {
      type: Object,
      required: true
    }
  },
  methods: {
    isChecked(value) {
      return this.checked && this.checked[value];
    }
  }
};
</script>
