import { makeConfig } from '../../rollup.config.mjs';

export default [
  makeConfig({
    outputFilename: 'bundle.browser.js',
    outputFormat: 'es',
  }),
  makeConfig({
    outputFormat: 'module',
    outputFilename: 'bundle.node.mjs',
  }),
  makeConfig({
    outputFormat: 'cjs',
    outputFilename: 'bundle.node.cjs',
  }),
];
