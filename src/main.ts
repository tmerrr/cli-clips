#!/usr/bin/env node

// import clArgs from 'command-line-args';
import { existsSync, mkdirSync } from 'fs';

import { CHEAT_SHEET_DIRECTORY } from './constants';
import { copyCommandToClipboard, handleCommand, handleTopic } from './cli';

enum Resource {
  Topic = 'topic',
  Topics = 'topics',
  Cmd = 'cmd',
}

const [, , resourceName, subcommand] = process.argv;

const isTopic = (resourceName: string): resourceName is Resource => {
  return resourceName === Resource.Topic || resourceName === Resource.Topics;
};

const isCommand = (resourceName: string): resourceName is Resource => {
  return resourceName === Resource.Cmd;
};

const main = async () => {
  if (!existsSync(CHEAT_SHEET_DIRECTORY)) {
    mkdirSync(CHEAT_SHEET_DIRECTORY);
  }

  if (!resourceName) {
    copyCommandToClipboard();
  } else if (isTopic(resourceName)) {
    handleTopic(subcommand);
  } else if (isCommand(resourceName)) {
    handleCommand(subcommand);
  } else {
    console.log(`"${resourceName}" is an invalid resource`);
  }
};

main();
