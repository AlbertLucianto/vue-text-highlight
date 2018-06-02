<template>
  <div class="fork__tag" @click="openGithub">
    <img :src="githubIcon" class="github__icon"/>
    <div class="fork__description">Fork me</div>
  </div>
</template>

<script>
const GITHUB_REPO = 'https://github.com/AlbertLucianto/vue-text-highlight';
const GITHUB_ICON = 'https://image.flaticon.com/icons/svg/25/25231.svg';

export default {
  data() {
    return {
      githubIcon: GITHUB_ICON,
    };
  },
  methods: {
    openGithub() {
      window.open(GITHUB_REPO);
    },
  },
};
</script>


<style lang="scss" scoped>
.fork__tag {
  position: fixed;
  z-index: 100;
  top: 20px;
  right: -35px;
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  background-color: #EEE;
  transform: rotate(45deg);
  transition: background-color .5s ease;
  .github__icon {
    width: 20px;
    opacity: .7;
  }
  @media screen and (max-width: 414px) {
    top: 5px;
    right: -52.5px;
    .fork__description {
      display: none;
    }
  }
  @media screen and (min-width: 414px) {
    .fork__description {
      position: absolute;
      bottom: -20px;
      opacity: 0;
      font-weight: 500;
      transition: all .2s ease;
      pointer-events: none;
      z-index: 0;
    }
    &:hover {
      transition: background-color .2s ease;
      background-color: #DDD;
      cursor: pointer;
      .fork__description {
        opacity: .7;
        bottom: -30px;
      }
    }
  }
}
</style>
