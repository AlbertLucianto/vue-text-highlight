<script>
import highlightChunks from './highlightChunks';

const classAndStyleTypes = [Object, Array, String];

export default {
  name: 'text-highlight',
  props: {
    queries: [Array, String, RegExp],
    caseSensitive: Boolean,
    highlightStyle: classAndStyleTypes,
    highlightClass: classAndStyleTypes,
    HighlightComponent: {
      type: [String, Object],
      default: 'mark',
    },
  },
  /**
   * Unless `h` is given as parameter, testing (Jest) will yield error:
   *    TypeError: unknown: Duplicate declaration "h"
   *    (This is an error on an internal node. Probably an internal error)
   *
   * Seems babel-plugin-transform-vue-jsx make strange behaivor.
   *
   * Related issue: https://github.com/storybooks/storybook/issues/2727
   */
  /* eslint-disable-next-line no-unused-vars */
  render(h) {
    return <span>
      {this.highlights
        .map(({
          text,
          isHighlighted,
          highlightIndex,
        }) => (
          !isHighlighted
            ? text
            : (
              <this.HighlightComponent
                class={['text__highlight', this.highlightClass]}
                style={this.highlightStyle}
                key={highlightIndex}
                index={highlightIndex}
              >
                {text}
              </this.HighlightComponent>
            )))}
    </span>;
  },
  computed: {
    highlights() {
      const defaultSlot = this.$slots.default;
      let text;

      if (!defaultSlot) text = '';
      else if (defaultSlot[0].tag !== undefined && process.env.NODE_ENV !== 'production') {
        /* eslint-disable-next-line no-console */
        console.warn('children of <text-highlight> must be a plain string.');
        text = '';
      } else {
        text = defaultSlot[0].text;
      }

      return highlightChunks(
        text,
        this.queries,
        this.caseSensitive,
      );
    },
  },
};
</script>

<style lang="scss">
.text__highlight {
  background: rgb(255, 204, 0);
  border-radius: 3px;
}
</style>
