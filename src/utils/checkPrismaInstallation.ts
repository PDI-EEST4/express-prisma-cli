import * as fs from 'fs';
import * as path from 'path';

export const checkPrismaInstalled = (): boolean => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('No package.json found. Are you inside a Node.js project?');
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    return 'prisma' in dependencies || 'prisma' in devDependencies;
  } catch (error) {
    throw new Error(`Error reading package.json: ${error}`);
  }
};
