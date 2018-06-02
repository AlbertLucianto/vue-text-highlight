<template>
  <div class="texts">
    <text-highlight :queries="queries">{{ texts }}</text-highlight>
  </div>
</template>

<script>
import TextHighlight from 'vue-text-highlight';
import texts from '../assets/data';

export default {
  props: {
    search: String,
    split: Boolean,
  },
  components: {
    TextHighlight,
  },
  data() {
    return {
      texts,
    };
  },
  computed: {
    queries() {
      return this.split ? this.search.split(/\s+/) : this.search;
    },
  },
};
</script>

<style lang="scss" scoped>
.texts {
  text-align: left;
  padding: 15px;
}
</style>

