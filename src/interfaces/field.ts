type Modifiers = '?' | '[]';

type WithModifiers<T extends string, M extends string> = `${T}${M}`;

type BaseTypes = 'String' | 'Int' | 'Decimal' | 'DateTime' | 'Boolean';

export type FieldTypes = 'fk' | WithModifiers<BaseTypes, Modifiers>;

export interface ParsedField {
  name: string;
  type: FieldTypes;
  unique?: boolean;
  references?: string;
}
