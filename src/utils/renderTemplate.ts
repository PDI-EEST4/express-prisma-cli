import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

export const renderTemplate = async (
  templatePath: string,
  data: Record<string, any>
): Promise<string> => {
  const fullPath = path.resolve(__dirname, '../templates', templatePath);

  try {
    const templateContent = await fs.promises.readFile(fullPath, 'utf-8');
    return ejs.render(templateContent, data);
  } catch (error) {
    console.error(`Error rendering template: ${templatePath}`, error);
    throw error;
  }
};
