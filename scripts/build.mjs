import fs from 'fs/promises';
import { rollup } from 'rollup';
import path from 'path';
import { clearPackageJSON } from 'clean-publish/core.js';

const distPath = process.argv[2];

async function run() {
  try {
    await fs.rm(distPath, { recursive: true, force: true });
  } catch {}
  await fs.mkdir(distPath);

  const { default: rollupConfig } = await import(
    path.join(process.cwd(), './rollup.config.mjs')
  );
  const bundle = await rollup(rollupConfig);
  await bundle.write(rollupConfig.output);

  const { default: packageJson } = await import(
    path.join(process.cwd(), './package.json'),
    {
      assert: { type: 'json' },
    }
  );
  packageJson.main = 'bundle.js';
  const clearedPackageJson = clearPackageJSON(packageJson);

  await fs.writeFile(
    path.join(distPath, 'package.json'),
    JSON.stringify(clearedPackageJson, null, ' '),
  );
}

run();
