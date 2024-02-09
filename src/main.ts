#!/usr/bin/env node

import clArgs from 'command-line-args';
import { existsSync, mkdirSync } from 'fs';

import { CHEAT_SHEET_DIRECTORY } from './constants';
import {
  addCommand,
  editCommand,
  printCommands,
  removeCommand,
  copyCommandToClipboard,
} from './cli/handlers/command';
import {
  addTopic,
  editTopic,
  printTopics,
  removeTopic,
} from './cli/handlers/topic';

enum Resource {
  Topic = 'topic',
  Topics = 'topics',
  Cmd = 'cmd',
}

enum SubCommand {
  Add = 'add',
  List = 'ls',
  Edit = 'edit',
  Remove = 'rm',
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
    { name: 'resource', defaultOption: true }
  ]
  const mainOptions = clArgs(mainDefinition, { stopAtFirstUnknown: true })
  const mainArgv = mainOptions._unknown || []
  const subDefinition = [
    { name: 'subcommand', defaultOption: true },
  ];
  const subOptions = clArgs(subDefinition, { stopAtFirstUnknown: true, argv: mainArgv });
  const { subcommand } = subOptions;

  if (!mainOptions.resource) {
    copyCommandToClipboard();
  } else if (isTopic(mainOptions.resource)) {
    switch (subcommand) {
      case SubCommand.Add:
        addTopic();
        break;
      case undefined: // list by default
      case SubCommand.List:
        printTopics();
        break;
      case SubCommand.Edit:
        editTopic();
        break;
      case SubCommand.Remove:
        removeTopic();
        break;
      default:
        console.log(`"${subcommand}" is an invalid command for the "topic" resource`);
    }
  } else if (isCommand(mainOptions.resource)) {
    switch (subcommand) {
      case undefined: // copy cmd by default
        copyCommandToClipboard();
        break;
      case SubCommand.Add:
        addCommand();
        break;
      case SubCommand.List:
        printCommands();
        break;
      case SubCommand.Edit:
        editCommand();
        break;
      case SubCommand.Remove:
        removeCommand();
        break;
      default:
        console.log(`"${subcommand}" is an invalid command for the "command" resource`);
        break;
    }
  } else {
    console.log(`"${mainOptions.resource}" is an invalid resource`);
  }
};

main();
