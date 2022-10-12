import { makeConfig } from '../../rollup.config.mjs';

export default [
  makeConfig({
    outputFilename: 'bundle.browser.js',
    outputFormat: 'es',
  }),
];
