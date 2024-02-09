import path from 'path';
import {
  existsSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
  renameSync,
  rmSync,
} from 'fs';
import { getTopicPath } from './common';

export const listCommands = (topic: string): string[] => {
  const text = _readTopicFile(topic);
  if (!text) {
    return [];
  }
  return text.split('\n');
};

// export const addCommandToTopic = (topic: string, cmd: string): void => {
//   _appendCommandToTopic(topic, cmd);
// };

export const overwriteCommandsInTopic = (topic: string, commands: string[]): void => {
  _overwriteTopicFile(topic, commands);
};

const _readTopicFile = (topic: string): string => {
  return readFileSync(getTopicPath(topic), 'utf8');
};

// const _appendCommandToTopic = (topic: string, command: string): void => {
//   appendFileSync(getTopicPath(topic), command);
// };

const _overwriteTopicFile = (topic: string, commands: string[]): void => {
  writeFileSync(getTopicPath(topic), commands.join('\n'));
};
