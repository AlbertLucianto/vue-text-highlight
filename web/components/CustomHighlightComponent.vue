<template>
  <mark
    class="custom"
    @mouseenter="setHovered"
    @mouseleave="unsetHovered"
  >
    <slot /><div v-if="showHoverMe" class="hover-me-tooltip">
      Hover me!
    </div><div class="tooltip">
      <slot />
      <img
        class="social twitter"
        src="../assets/twitter.svg"
        @click="alert('tweeted')"
      />
      <img
        class="social"
        src="../assets/facebook.svg"
        @click="alert('shared')"
      />
    </div>
  </mark>
</template>

<script>
export default {
  props: {
    index: Number,
    text: String,
    activeIndex: Number,
    displayHoverMe: Boolean,
  },
  computed: {
    showHoverMe() {
      return this.index === 0
        && this.activeIndex === null
        && this.displayHoverMe;
    },
  },
  methods: {
    setHovered() {
      this.$emit('enter', this.index);
    },
    unsetHovered() {
      this.$emit('leave');
    },
    alert(message) {
      // eslint-disable-next-line no-alert
      alert(message);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom {
  position: relative;

  .tooltip,
  .hover-me-tooltip {
    position: absolute;
    white-space: nowrap;
    bottom: calc(100% + 5px);
    border-radius: 5px;
    transition: all .2s ease;
  }

  &:not(:hover) .tooltip,
  &:hover .hover-me-tooltip,
  .hover-me-tooltip.hidden {
    opacity: 0;
    visibility: hidden;
  }

  &:not(:hover) .tooltip {
    transform: translate(-50%, 5px);
  }

  .tooltip {
    left: 50%;
    display: flex;
    align-items: center;
    padding: 2px;
    padding-left: 12px;
    justify-content: flex-end;
    transform: translate(-50%);
    background-color: white;
    box-shadow: 0 5px 15px -5px rgba(black, .4);
    border: 1px solid #42b983;
    color: darken(#42b983, 10%);

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 5px;
    }
  }

  .hover-me-tooltip {
    right: calc(50% - 15px);
    padding: 5px 10px;
    pointer-events: none;
    padding-right: 30px;
    font-size: 18px;
    background-color: #42b983;
    color: white;
    font-weight: 600;
    opacity: 0;
    transform: translateY(5px);
    box-shadow: 0 3px 20px -3px rgba(black, .5);
    animation: hover-me .2s ease forwards .1s;

    &::after {
      content: '';
      position: absolute;
      transform: rotate(135deg);
      right: 10px;
      top: 10px;
      width: 7.5px;
      height: 7.5px;
      border-width: 3px 3px 0 0;
      border-style: solid;
      border-color: white;
      animation: arrow 1s ease alternate infinite;
    }
  }

  @keyframes hover-me {
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes arrow {
    0% {
      transform: translateY(5px) rotate(135deg);
    }

    100% {
      transform: rotate(135deg);
    }
  }

  .social {
    width: 20px;
    height: 20px;
    margin: 5px;
    cursor: pointer;

    &.twitter {
      margin-left: 20px;
    }
  }
}
</style>
