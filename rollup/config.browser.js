import { minify } from 'uglify-es';
import { uglify } from 'rollup-plugin-uglify';
import base from './config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-text-highlight.min.js',
    format: 'iife',
    exports: 'named',
    name: 'VueTextHighlight',
  },
});

config.plugins.push(uglify({}, minify));

export default config;
