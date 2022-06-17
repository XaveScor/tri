import BabelPlugin from '@rollup/plugin-babel';
import NodeResolve from '@rollup/plugin-node-resolve';
import NodeExternals from 'rollup-plugin-node-externals';

const extensions = ['.ts'];

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.ts',
  output: {
    file: 'bundle.js',
    format: 'es',
  },
  plugins: [
    NodeExternals(),
    NodeResolve({
      extensions,
    }),
    BabelPlugin({
      rootMode: 'upward',
      extensions,
    }),
  ],
};
