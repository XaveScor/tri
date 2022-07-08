const baseConfig = require('../../babel.config.cjs');
const deepmerge = require('deepmerge');

module.exports = deepmerge(baseConfig, {
  presets: ['@babel/preset-react'],
});
