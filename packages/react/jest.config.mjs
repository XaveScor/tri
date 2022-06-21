import deepmerge from 'deepmerge';
import baseConfig from '../../jest.config.mjs';

export default deepmerge(baseConfig, {
  rootDir: 'src',
});
