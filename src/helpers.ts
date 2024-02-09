import { existsSync } from 'fs';
import inquirer from 'inquirer';
import { createInterface } from 'readline';
import path from 'path';

import { CHEAT_SHEET_DIRECTORY } from './constants';
import { listCommands } from './repositories/commands';
import { listTopics } from './repositories/topic';

const KEY = 'Q';

export const getInput = async (question: string): Promise<string> => {
  const answer = await inquirer.prompt([
    {
      name: KEY,
      message: question,
      prefix: '',
      type: 'input',
    }
  ]);
  return answer[KEY].trim();
};

export const selectInput = async (question: string, choices: string[]): Promise<string> => {
  const answer = await inquirer.prompt([
    {
      name: KEY,
      message: question,
      prefix: '',
      type: 'list',
      choices,
    }
  ]);
  return answer[KEY].trim();
};

export const editInput = (value: string): Promise<string> => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.prompt();
    rl.write(value);
    rl.on('line', (input) => {
      resolve(input.trim());
      rl.close();
    });
  })
};

export const confirmInput = async (question: string): Promise<boolean> => {
  const answer = await inquirer.prompt([
    {
      name: KEY,
      type: 'confirm',
      message: question,
      prefix: '',
    }
  ]);
  return answer[KEY];
}

export const selectTopic = async (prompt: string): Promise<string | null> => {
  const topics = listTopics();
  if (topics.length) {
    const topic = await selectInput(prompt, topics);
    return topic;
  } else {
    console.log('No topics found');
    return null;
  }
};

export const selectCommandFromTopic = async (topic: string, prompt: string): Promise<string | null> => {
  const commands = listCommands(topic);
  if (commands.length) {
    return selectInput(prompt, commands);
  } else {
    console.log('No commands in topic');
    return null;
  }
};

export const topicExists = (topic: string): boolean => {
  return existsSync(getTopicPath(topic));
};

export const getTopicPath = (topicName: string): string => {
  return path.join(CHEAT_SHEET_DIRECTORY, topicName);
};
