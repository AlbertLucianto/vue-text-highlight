import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

const config = require('../package.json');

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.vue', '.js', '.jsx', '.json'],
    }),
    cjs({
      include: 'node_modules/**',
    }),
    vue({
      template: {
        isProduction: true,
      },
    }),
    babel({
      exclude: 'node_modules/!(clone-regexp|is-regexp)/**',
      plugins: [
        'external-helpers',
      ],
      runtimeHelpers: true,
    }),
    replace({
      VERSION: JSON.stringify(config.version),
    }),
  ],
  external: ['vue'],
  watch: {
    include: 'src/**',
  },
};
