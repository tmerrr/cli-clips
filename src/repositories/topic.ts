import path from 'path';
import {
  existsSync,
  readdirSync,
  writeFileSync,
  renameSync,
  rmSync,
} from 'fs';
import { CHEAT_SHEET_DIRECTORY } from '../constants';

export const listTopics = (): string[] => {
  const topics = readdirSync(CHEAT_SHEET_DIRECTORY);
  return topics;
};

export const createTopic = (topic: string): void => {
  if (topicExists(topic)) {
    console.error(`Topic "${topic}" already exists`);
  } else {
    _createTopic(topic);
  }
};

export const renameTopic = (originalTopic: string, newTopic: string): void => {
  if (!topicExists(originalTopic)) {
    console.error(`Topic "${originalTopic}" does not exist`);
    return;
  }
  if (topicExists(newTopic)) {
    console.error(`Topic "${newTopic}" already exists`);
    return;
  }
  _renameTopic(originalTopic, newTopic);
};

export const deleteTopic = (topic: string): void => {
  if (topicExists(topic)) {
    _deleteTopic(topic);
  } else {
    console.error(`Topic "${topic}" does not exist`);
  }
};

export const topicExists = (topic: string): boolean => {
  return existsSync(getTopicPath(topic));
};

const _createTopic = (topic: string): void => {
  writeFileSync(getTopicPath(topic), '');
};

const _renameTopic = (originalTopic: string, newTopic: string): void => {
  renameSync(getTopicPath(originalTopic), getTopicPath(newTopic));
}

const _deleteTopic = (topic: string): void => {
  rmSync(getTopicPath(topic), { recursive: true });
};

const getTopicPath = (topicName: string): string => {
  return path.join(CHEAT_SHEET_DIRECTORY, topicName);
};
