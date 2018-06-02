<template>
  <div class="inputField__container">
    <div class="inputField__label" v-if="label">{{ label }}</div>
    <div
      :class="{
        inputField__wrapper: true,
        focus: isFocus,
      }">
      <input
        class="inputField__field"
        v-on="$listeners"
        v-bind="$attrs"
        @focus="setFocus"
        @blur="setBlur"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
  data() {
    return {
      isFocus: false,
    };
  },
  methods: {
    setFocus() { this.isFocus = true; },
    setBlur() { this.isFocus = false; },
  },
};
</script>

<style lang="scss" scoped>
.inputField__container {
  display: inline-block;
  text-align: left;
  margin: 10px 0;
  .inputField__label {
    font-size: 14px;
    opacity: 0.8;
    user-select: none;
  }
  .inputField__wrapper {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgba($color: #000000, $alpha: .1);
    &.focus {
      border: 1px solid #42b983A0;
    }
    .inputField__field {
      font-size: 16px;
      color: #333333;
      border: none;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
