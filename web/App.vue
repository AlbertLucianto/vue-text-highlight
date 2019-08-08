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
          @input="updateSearch"
          label="Search"
          class="textField"></input-field>
        <div class="row">
          <div class="column">
            <check-box
              :defaultValue="split"
              @onchange="updateSplit"
              class="checkBox">Split by space</check-box>
          </div>
          <div class="column">
            <check-box
              :defaultValue="custom"
              @onchange="updateCustom"
              class="checkBox">Custom component</check-box>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <check-box
              :defaultValue="caseSensitive"
              @onchange="updateCaseSensitive"
              class="checkBox">Case sensitive</check-box>
          </div>
          <div class="column">
            <check-box
              :defaultValue="diacriticsSensitive"
              @onchange="updateDiacriticsSensitive"
              class="checkBox">Diacritics sensitive</check-box>
          </div>
        </div>
      </div>
      <example-document
        :search="search"
        :split="split"
        :custom="custom"
        :caseSensitive="caseSensitive"
        :diacriticsSensitive="diacriticsSensitive"></example-document>
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
      custom: false,
      caseSensitive: false,
      diacriticsSensitive: false,
    };
  },
  methods: {
    updateSearch(e) {
      this.search = e.target.value;
    },
    updateSplit(val) {
      this.split = val;
    },
    updateCustom(val) {
      this.custom = val;
    },
    updateCaseSensitive(val) {
      this.caseSensitive = val;
    },
    updateDiacriticsSensitive(val) {
      this.diacriticsSensitive = val;
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #FAFAFA;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: calc(5vh + 5%);
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
    margin-bottom: 20px;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    .textField {
      flex-grow: 1;
      padding-bottom: 10px;
      width: 100%;
    }
    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-bottom: 5px;
      width: 100%;
    }

    .column {
      display: flex;
      flex-direction: column;
      flex-basis: 50%;
    }
  }
}
</style>
