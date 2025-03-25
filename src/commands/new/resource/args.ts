import { ParsedField } from '../../../interfaces/field';

export interface ResourceParsedArgs {
  resourceName: string;
  tableName: string;
  fields: ParsedField[];
  timestamps: boolean;
}
