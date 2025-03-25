export interface CommandHandler {
  run(argv: string[]): unknown;
}
