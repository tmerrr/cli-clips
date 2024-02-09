import {
  readFileSync,
  writeFileSync,
} from 'fs';
import { getTopicPath } from '../helpers';

export const listCommands = (topic: string): string[] => {
  const text = _readTopicFile(topic);
  if (!text) {
    return [];
  }
  return text.split('\n');
};

export const overwriteCommandsInTopic = (topic: string, commands: string[]): void => {
  _overwriteTopicFile(topic, commands);
};

const _readTopicFile = (topic: string): string => {
  return readFileSync(getTopicPath(topic), 'utf8');
};

const _overwriteTopicFile = (topic: string, commands: string[]): void => {
  writeFileSync(getTopicPath(topic), commands.join('\n'));
};
