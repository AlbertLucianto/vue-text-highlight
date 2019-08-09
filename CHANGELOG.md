# Changelog

## 2.0.9

### Supports diacritics sensitive

* __`[diacriticsSensitive]:`__ `Boolean`
  
  Whether string being searched is diacritics sensitive.

## 2.0.0

### Supports Custom Component

* __`[highlightComponent]:`__ `Object|String`

  By default vue-text-highlight uses `<mark>` for the highlighting. Pass this props to override with other tag (`string`) or custom component (Vue component definition).

  This component will be passed with two props from `text-highlight`:

  * __`index:`__ `Number`

    Index of highlighted component.

  * __`text:`__ `String`

    Highlighted words, equals to `this.$slots.default[0].text`

* Other props and listeners that are not listed above are forwarded to the highlighted component. These props will be merged with highter precendence with `index` and `text` passed from `text-highlight`.

### Default Tags Changed

In v1, the non-highlighted and highlighted words are wrapped with `<span>`. In v2, non-highlighted words are plain string and highlighted words are wrapped with `<mark>`.

## 1.1.0

### Supports `RegExp` query

Update props in `TextHighlight` component:

* __`queries:`__ `Array<String|RegExp>|String|RegExp`

  This prop accepts string, regex, and array of strings or regex. If array is given, it will highlight the union of matched strings/regex globally.

## 1.0.0

Initial release.