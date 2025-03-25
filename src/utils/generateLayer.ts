import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { renderTemplate } from './renderTemplate';

type Layer = 'repositories' | 'services' | 'controllers' | 'di' | 'routes';

const file: Record<Layer, string> = {
  repositories: 'repository',
  controllers: 'controller',
  di: 'container',
  services: 'service',
  routes: 'routes',
};

export const generateLayer = async (resourceName: string, layer: Layer) => {
  const outputDir = path.resolve(`src/${layer}`);
  const outputFile = path.join(
    outputDir,
    `${resourceName.toLocaleLowerCase()}.${file[layer]}.ts`
  );

  if (!existsSync(outputDir)) {
    await fs.mkdir(outputDir, { recursive: true });
  }

  const content = await renderTemplate(`${file[layer]}.ejs`, { resourceName });

  return fs.writeFile(outputFile, content);
};
