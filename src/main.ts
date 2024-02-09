#!/usr/bin/env node

import clArgs from 'command-line-args';
import { existsSync, mkdirSync } from 'fs';

import { CHEAT_SHEET_DIRECTORY } from './constants';
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
  
  if (isTopic(mainOptions.resource)) {
  
    const subDefinition = [
      { name: 'subcommand', defaultOption: true },
    ];
    const subOptions = clArgs(subDefinition, { stopAtFirstUnknown: true, argv: mainArgv });

    const { subcommand } = subOptions;
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
        console.log(`"${subcommand}" is an invalid command for the topic resource`);
    }
  
  } else if (isCommand(mainOptions.resource)) {

  } else if (!mainOptions.resource) {
    const resources = Object.values(Resource).map((resource) => `"${resource}"`);
    console.log(`Must specify a resource: ${resources.join(', ')}`);
  } else{
    console.log(`"${mainOptions.resource}" is an invalid resource`);
  }
};

main();
