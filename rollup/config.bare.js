import css from 'rollup-plugin-css-only';
import vue from 'rollup-plugin-vue';
// import sass from 'rollup-plugin-sass';
import base from './config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/component.js',
    format: 'umd',
    name: 'vue-text-highlight',
  },
  plugins: [
    css({
      output: 'dist/style.css',
    }),
    ...base.plugins.map((plugin) => {
      if (plugin.name === 'VuePlugin') {
        return vue({
          template: {
            isProduction: true,
          },
          css: false,
        });
      }
      return plugin;
    }),
  ],
});

export default config;
