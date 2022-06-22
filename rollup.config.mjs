import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { externals } from 'rollup-plugin-node-externals';
import path from 'path';

const extensions = ['.ts', '.tsx'];

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: path.join(process.cwd(), 'src', 'index.ts'),

  output: {
    file: path.join(process.cwd(), 'dist', 'bundle.js'),
    format: 'es',
  },
  plugins: [
    externals(),
    nodeResolve({
      extensions,
    }),
    babel({
      rootMode: 'upward',
      babelHelpers: 'bundled',
      extensions,
    }),
  ],
};
