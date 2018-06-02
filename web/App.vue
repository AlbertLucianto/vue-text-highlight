<template>
  <div id="app">
    <fork-tag></fork-tag>
    <h1>
      <text-highlight
        queries="highlight"
        highlightClass="titleHighlight">vue text highlight</text-highlight>
    </h1>
    <div class="card">
      <div class="inputs">
        <input-field
          @keyup="updateSearch"
          label="Search"
          class="textField"></input-field>
        <check-box
          :defaultValue="split"
          @onchange="updateSplit"
          class="checkBox">Split by space</check-box>
      </div>
      <example-document :search="search" :split="split"></example-document>
    </div>
  </div>
</template>

<script>
import TextHighlight from 'vue-text-highlight';
import ExampleDocument from './components/ExampleDocument';
import InputField from './components/InputField';
import CheckBox from './components/CheckBox';
import ForkTag from './components/ForkTag';

export default {
  name: 'App',
  components: {
    ExampleDocument,
    InputField,
    CheckBox,
    TextHighlight,
    ForkTag,
  },
  data() {
    return {
      search: '',
      split: false,
    };
  },
  methods: {
    updateSearch(e) {
      this.search = e.target.value;
    },
    updateSplit(val) {
      this.split = val;
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #FDFDFD;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: calc(10vh + 5%);
  .titleHighlight {
    background-color: #42b983;
    color: #FFFFFFF0;
  }
  .card {
    width: 500px;
    max-width: 100vw;
    margin: auto;
    margin-top: 40px;
    background: white;
    padding: 20px;
    padding-bottom: 30px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0,0,0,.1);
  }
  .inputs {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    flex-wrap: wrap;
    .checkBox {
      margin-left: 30px;
    }
    .textField {
      flex-grow: 1;
      padding-bottom: 10px;
    }
  }
}
</style>
