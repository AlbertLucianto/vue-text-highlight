import base from './config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-text-highlight.esm.js',
    format: 'es',
  },
});

export default config;
