import base from './config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-text-highlight.umd.js',
    format: 'umd',
    name: 'vue-text-highlight',
  },
});

export default config;
