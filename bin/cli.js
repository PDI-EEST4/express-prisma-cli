#!/usr/bin/env node

const { createResource, startApp } = require('../index');

const args = process.argv.slice(2);
const command = args[0];
const resourceName = args[1];

if (command === 'create-resource' && resourceName) {
    createResource(resourceName);
}

if (command === 'start-app') {
    startApp();
}
