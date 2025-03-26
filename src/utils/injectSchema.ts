import { existsSync } from 'fs';
import { promises as fsPromises } from 'fs';
import { renderTemplate } from './renderTemplate';
import { ParsedField } from '../interfaces/field';

export const injectSchema = async (
  resource: string,
  table: string,
  fields: ParsedField[],
  timestamps: boolean
) => {
  const outputFile = './prisma/schema.prisma';
  const outputDir = './prisma';

  if (!existsSync(outputDir)) {
    throw new Error('Prisma schema not found');
  }

  const content = await renderTemplate(`schema.ejs`, {
    resourceName: resource,
    tableName: table,
    fields,
    timestamps,
  });

  return fsPromises.appendFile(outputFile, content);
};
