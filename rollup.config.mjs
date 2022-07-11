import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { externals } from 'rollup-plugin-node-externals';
import path from 'path';

const extensions = ['.ts', '.tsx'];

/**
 *
 * @param args {object}
 * @param args.externalsOptions {import('rollup-plugin-node-externals').ExternalsOptions}
 * @param args.inputDir {string}
 * @param args.outputFilename {string}
 * @param args.outputFormat {import('rollup').RollupOptions.output.format}
 * @returns {import('rollup').RollupOptions}
 */
export function makeConfig(args = {}) {
  const inputDir = args.inputDir ?? 'src';
  const outputFormat = args.outputFormat ?? 'es';
  const outputFilename = args.outputFilename ?? 'bundle.js';
  /**
   * @type {import('rollup').RollupOptions}
   */

  return {
    input: path.join(process.cwd(), inputDir, 'index.ts'),

    output: {
      file: path.join(process.cwd(), 'dist', outputFilename),
      format: outputFormat,
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
