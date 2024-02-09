import path from 'path';
import { existsSync } from 'fs';
import { CHEAT_SHEET_DIRECTORY } from '../constants';

export const topicExists = (topic: string): boolean => {
  return existsSync(getTopicPath(topic));
};

export const getTopicPath = (topicName: string): string => {
  return path.join(CHEAT_SHEET_DIRECTORY, topicName);
};
