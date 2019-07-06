<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import highlightChunks from './highlightChunks';

const classAndStyleTypes = [Object, Array, String];

@Component({
  props: {
    queries: [Array, String, RegExp],
    text: String,
    caseSensitive: Boolean,
    highlightStyle: classAndStyleTypes,
    highlightClass: classAndStyleTypes,
  },
})
export default class TextHighlight extends Vue {
  render(h) {
    return h(
      'span',
      this.highlights
        .map(({
          text,
          isHighlighted,
          highlightIndex: index,
        }) => (!isHighlighted
          ? text
          : this.renderHighlighted(h, {
            key: index,
            class: ['text__highlight', this.highlightClass],
            style: this.highlightStyle,
            props: { index, text, ...this.$attrs },
            on: this.$listeners,
          }, text)
        )),
    );
  }

  renderHighlighted(h, data, children) {
    if (this.$scopedSlots.default) return this.$scopedSlots.default(data);
    return h('mark', data, children);
  }

  get attributes() {
    return {
      props: this.$attrs,
      on: this.$listeners,
    };
  }

  get highlights() {
    return highlightChunks(
      this.text,
      this.queries,
      this.caseSensitive,
    );
  }
}
</script>

<style lang="scss">
.text__highlight {
  background: rgb(255, 204, 0);
  border-radius: 3px;
}
</style>
