<template>
  <div class="checkBox"
    @click="toggle"
    @touchdown="toggle">
    <div
      :class="['checkBox__box', { active }]">
      <svg class="checkBox__tick" viewBox="0 0 30 30">
        <path d="M 5 15 L 12.5 22.5 L 25 5"></path>
      </svg>
    </div>
    <div :class="['checkBox__label', { active }]"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    defaultValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
      this.$emit('onchange', this.active);
    },
  },
  mounted() {
    this.active = this.defaultValue;
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;

.checkBox {
  display: flex;
  align-items: center;
  cursor: pointer;
  &__box {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid $green;
    transition: all .1s ease;
    &.active {
      background-color: $green;
    }
  }
  &__tick {
    width: 100%;
    height: 100%;
    path {
      fill: rgba(0, 0, 0, 0);
      stroke: white;
      stroke-width: 3px;
      stroke-linecap: round;
    }
  }
  &__label {
    padding-left: 20px;
    padding-top: 3px;
    font-size: 18px;
    font-weight: 500;
    color: $green;
    opacity: .5;
    user-select: none;
    &.active {
      opacity: 1;
    }
  }
}
</style>
