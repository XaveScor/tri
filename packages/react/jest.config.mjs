import deepmerge from 'deepmerge';
import commonConfig from '../../jest.config.common.mjs';

export default deepmerge(commonConfig, {
  displayName: '@widgeteria/react',
  rootDir: 'src',
});
