#!/usr/bin/env node

import clArgs from 'command-line-args';
import { existsSync, mkdirSync } from 'fs';

import { CHEAT_SHEET_DIRECTORY } from './constants';
import { copyCommandToClipboard, handleCommand, handleTopic } from './cli';

enum OptionDefinition {
  Resource = 'resource',
  SubCommand = 'subcommand',
}

enum Resource {
  Topic = 'topic',
  Topics = 'topics',
  Cmd = 'cmd',
}

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

  const mainDefinition = [
    { name: OptionDefinition.Resource, defaultOption: true }
  ]
  const mainOptions = clArgs(mainDefinition, { stopAtFirstUnknown: true })
  const mainArgv = mainOptions._unknown || []
  const resourceName = mainOptions[OptionDefinition.Resource];

  const subDefinition = [
    { name: OptionDefinition.SubCommand, defaultOption: true },
  ];
  const subOptions = clArgs(subDefinition, { stopAtFirstUnknown: true, argv: mainArgv });
  const subcommand = subOptions[OptionDefinition.SubCommand];

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
