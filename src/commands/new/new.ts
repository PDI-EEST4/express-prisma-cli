import { command } from 'cleye';
import { NewResourceHandler } from './resource/handler';
import { CommandHandler } from '../../interfaces/handler';

export const newCommand = command(
  {
    name: 'new',
    parameters: ['<type>', '<name>', '[fields...]'],
  },
  (argv) => {
    const handlers: Record<string, CommandHandler> = {
      resource: new NewResourceHandler(),
    };

    handlers[argv._.type].run([argv._.name, ...argv._.fields]);
  }
);
