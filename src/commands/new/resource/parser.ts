import { ParsedField } from '../../../interfaces/field';
import { ResourceParsedArgs } from './args';

export class ResourceArgsParser implements ArgsParser<ResourceParsedArgs> {
  constructor() {}

  parse(args: string[]): ResourceParsedArgs {
    const [resource, ...fieldsArg] = args;

    const parsed: ResourceParsedArgs = {
      resourceName: resource,
      tableName: resource.toLocaleLowerCase() + 's',
      timestamps: fieldsArg.includes('timestamps'),
      fields: [] as ParsedField[],
    };

    const fields = fieldsArg
      .filter((arg) => arg !== 'timestamps')
      .map((arg) => {
        const [name, type, mod] = arg.split(':');
        let field: any = {
          name,
        };

        if (type === 'references') {
          field.type = 'fk';
          field.references = mod;
        } else {
          field.type = type.charAt(0).toUpperCase() + type.slice(1);
          field.unique = mod === 'unique';
        }

        return field;
      });

    parsed.fields = fields;

    return parsed;
  }
}
