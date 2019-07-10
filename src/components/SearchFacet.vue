<template>
  <div v-show="facet.data.length" class="sui-multi-checkbox-facet sui-facet">
    <div class="sui-multi-checkbox-facet__label">
      {{ facet.field }}
    </div>
    <div class="sui-multi-checkbox-facet__options-list">
      <label
        v-for="facetItem in facet.data"
        :key="facetItem.value"
        class="sui-multi-checkbox-facet__option-label"
      >
        <div class="sui-multi-checkbox-facet__option-input-wrapper">
          <input
            class="sui-multi-checkbox-facet__checkbox"
            type="checkbox"
            :value="facetItem.value"
            :checked="isChecked(facetItem.value)"
            @change="$emit('change', $event)"
          />
          <span class="sui-multi-checkbox-facet__input-text">{{
            facetItem.value
          }}</span>
        </div>
        <span class="sui-multi-checkbox-facet__option-count">{{
          facetItem.count
        }}</span>
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
      type: Array,
      required: true
    }
  },
  methods: {
    isChecked(value) {
      return this.checked && this.checked.includes(value);
    }
  }
};
</script>
