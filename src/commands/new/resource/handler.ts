import { CommandHandler } from '../../../interfaces/handler';
import { checkPrismaInstalled } from '../../../utils/checkPrismaInstallation';
import { generateLayer } from '../../../utils/generateLayer';
import { injectSchema } from '../../../utils/injectSchema';
import { ResourceParsedArgs } from './args';
import { ResourceArgsParser } from './parser';

export class NewResourceHandler implements CommandHandler {
  private readonly parser: ArgsParser<ResourceParsedArgs>;

  constructor() {
    this.parser = new ResourceArgsParser();
  }

  async run(argv: string[]) {
    const args = this.parser.parse(argv);

    if (!checkPrismaInstalled()) {
      throw new Error('Prisma not detected in the current project');
    }

    await Promise.allSettled([
      injectSchema(
        args.resourceName,
        args.tableName,
        args.fields,
        args.timestamps
      ),
      generateLayer(args.resourceName, 'repositories'),
      generateLayer(args.resourceName, 'controllers'),
      generateLayer(args.resourceName, 'services'),
      generateLayer(args.resourceName, 'di'),
      generateLayer(args.resourceName, 'routes'),
    ]);
  }
}
