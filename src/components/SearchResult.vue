<template>
  <img :src="imageSrc(result.id.raw)" :alt="result.name.raw" width="256" />
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
