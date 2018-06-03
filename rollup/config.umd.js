
import base from './config.base';

const config = Object.assign({}, base, {
  exports: 'named',
  output: {
    file: 'dist/vue-text-highlight.umd.js',
    format: 'umd',
  },
});

export default config;
