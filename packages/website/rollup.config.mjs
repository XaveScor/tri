import fs from 'node:fs';
import path from 'path';
import { makeConfig } from '../../rollup.config.mjs';

const packageJsonPaths = fs
  .readdirSync('..')
  .map((dir) => path.join('..', dir, 'package.json'));

const widgeteriaPackages = packageJsonPaths
  .map((packageJsonPath) =>
    JSON.parse(fs.readFileSync(packageJsonPath).toString()),
  )
  .map(({ name }) => name);

export default makeConfig({
  externalsOptions: {
    include: ['react-dom/server'],
    packageJson: packageJsonPaths,
    exclude: widgeteriaPackages,
  },
});
