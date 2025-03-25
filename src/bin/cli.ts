#!/usr/bin/env node

import { cli } from 'cleye';
import { newCommand } from '../commands/new/new';

const argv = cli({
  name: 'express-prisma-cli',
  version: '1.0.0',
  commands: [newCommand],
});
