import fs from 'fs';
import { rollup } from 'rollup';
import path from 'path';
import { clearPackageJSON } from 'clean-publish/core.js';

const distPath = process.argv[2];

async function run() {
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
  fs.mkdirSync(distPath);

  const { default: rollupConfig } = await import(
    path.join(process.cwd(), './rollup.config.mjs')
  );
  const rollupConfigs = Array.isArray(rollupConfig)
    ? rollupConfig
    : [rollupConfig];

  await Promise.all(
    rollupConfigs.map(async (config) => {
      const bundle = await rollup(config);
      await bundle.write(config.output);
    }),
  );

  const { default: packageJson } = await import(
    path.join(process.cwd(), './package.json'),
    {
      assert: { type: 'json' },
    }
  );
  packageJson.main = 'bundle.js';
  const clearedPackageJson = clearPackageJSON(packageJson);

  fs.writeFileSync(
    path.join(distPath, 'package.json'),
    JSON.stringify(clearedPackageJson, null, ' '),
  );

  const readmePath = path.join(process.cwd(), 'readme.md');
  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, path.join(distPath, 'readme.md'));
  }
}

run();
