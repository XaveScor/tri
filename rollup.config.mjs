import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { externals } from 'rollup-plugin-node-externals';
import path from 'path';

const extensions = ['.ts', '.tsx'];

/**
 *
 * @param args {object}
 * @param args.externalsOptions {import('rollup-plugin-node-externals').ExternalsOptions}
 * @returns {import('rollup').RollupOptions}
 */
export function makeConfig(args = {}) {
  /**
   * @type {import('rollup').RollupOptions}
   */
  return {
    input: path.join(process.cwd(), 'src', 'index.ts'),

    output: {
      file: path.join(process.cwd(), 'dist', 'bundle.js'),
      format: 'es',
    },
    plugins: [
      externals(args.externalsOptions),
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
}

export default makeConfig();
