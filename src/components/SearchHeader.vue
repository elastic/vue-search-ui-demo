<template>
  <div class="sui-layout-header">
    <div class="sui-layout-header__inner">
      <form
        role="combobox"
        aria-expanded="false"
        aria-haspopup="listbox"
        aria-labelledby="downshift-0-label"
        action=""
        @submit.prevent="$emit('submit', $event.target.value)"
      >
        <div class="sui-search-box">
          <div class="sui-search-box__wrapper">
            <input
              id="downshift-0-input"
              type="text"
              aria-autocomplete="list"
              aria-labelledby="downshift-0-label"
              autocomplete="off"
              placeholder="Search your documents"
              class="sui-search-box__text-input"
              :value="value"
              @input="$emit('input', $event.target.value)"
            />
          </div>
          <input
            type="submit"
            class="button sui-search-box__submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String
    }
  }
};
</script>
