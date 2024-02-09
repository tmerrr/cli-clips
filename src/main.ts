#!/usr/bin/env node

import clArgs from 'command-line-args';
import { existsSync, mkdirSync } from 'fs';
// import args from 'args';

import { getInput, editInput, selectInput } from './cli';
import { CHEAT_SHEET_DIRECTORY } from './constants';
import { createTopic, listTopics, renameTopic, deleteTopic } from './handlers/topic';
import path from 'path';

type ResourceName = 'topic' | 'cmd';

type SubCommandName = 'add' | 'ls' | 'edit' | 'rm';

const main = async () => {
  if (!existsSync(CHEAT_SHEET_DIRECTORY)) {
    mkdirSync(CHEAT_SHEET_DIRECTORY);
  }
  
  const mainDefinition = [
    { name: 'resource', defaultOption: true }
  ]
  const mainOptions = clArgs(mainDefinition, { stopAtFirstUnknown: true })
  const mainArgv = mainOptions._unknown || []
  
  if (mainOptions.resource === 'topic') {
  
    const subDefinition = [
      { name: 'subcommand', defaultOption: true },
    ];
    const subOptions = clArgs(subDefinition, { stopAtFirstUnknown: true, argv: mainArgv });
  
    if (subOptions.subcommand === 'ls') {
      const topics = listTopics();
      if (topics.length) {
        topics.forEach((topic) => console.log(topic));
      } else {
        console.log('No topics found, try creating one!');
      }
    } else if (subOptions.subcommand === 'add') {
      const addTopicDefinition = [
        { name: 'topicName', defaultOption: true }
      ];
      const addTopicOptions = clArgs(addTopicDefinition, { argv: subOptions._unknown ?? [] });
      if (addTopicOptions.topicName) {
        createTopic(addTopicOptions.topicName);
      } else {
        const topicName = await getInput('Enter new topic name: ');
        createTopic(topicName);
      }
    } else if (subOptions.subcommand === 'edit') {
      const editTopicDefinition = [
        { name: 'topicName', defaultOption: true }
      ];
      const editTopicOptions = clArgs(editTopicDefinition, { argv: subOptions._unknown ?? [] });
      if (editTopicOptions.topicName) {
        const newTopicName = await editInput(editTopicOptions.topicName);
        renameTopic(editTopicOptions.topicName, newTopicName);
      } else {
        const topics = listTopics();
        if (!topics.length) {
          console.log('No topics found, try creating one!');
          return;
        }
        const oldTopicName = await selectInput('Select a topic name to edit:', topics);
        const newTopicName = await editInput(oldTopicName);
        renameTopic(oldTopicName, newTopicName);
      }
    } else if (subOptions.subcommand === 'rm') {
      const deleteTopicDefinition = [
        { name: 'topicName', defaultOption: true }
      ];
      const deleteTopicOptions = clArgs(deleteTopicDefinition, { argv: subOptions._unknown ?? [] });
      if (deleteTopicOptions.topicName) {
        deleteTopic(deleteTopicOptions.topicName);
      } else {
        const topics = listTopics();
        if (!topics.length) {
          console.log('No topics found, try creating one!');
          return;
        }
        const topicName = await selectInput('Select a topic name to delete:', topics);
        deleteTopic(topicName);
      }
    }
  
  }
  
};

main();
