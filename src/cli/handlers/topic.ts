import {
  getInput,
  editInput,
  confirmInput,
} from '../helpers';
import {
  createTopic,
  listTopics,
  renameTopic,
  deleteTopic,
} from '../../repositories/topic';
import { topicExists } from '../../repositories/common';
import { selectTopic } from './common';

export const addTopic = async () => {
  const topic = await getInput('Enter new topic name: ');
  if (topicExists(topic)) {
    console.error(`Topic "${topic}" already exists`);
    return;
  }
  createTopic(topic);
  console.log(`Topic "${topic}" created`);
};

export const printTopics = async () => {
  const topics = listTopics();
  if (topics.length) {
    console.log(topics.join('\n'));
    // topics.forEach((topic) => console.log(topic));
  } else {
    console.log('No topics found');
  }
};

export const editTopic = async () => {
  const topic = await selectTopic('Select topic to edit: ');
  if (topic === null) {
    return;
  }
  const newName = await editInput(topic);
  if (topicExists(newName)) {
    console.error(`Topic "${newName}" already exists`);
    return;
  }
  renameTopic(topic, newName);
  console.log(`Topic "${topic}" renamed to "${newName}"`);
};

export const removeTopic = async () => {
  const topic = await selectTopic('Select topic to delete: ');
  if (topic === null) {
    return;
  }
  console.log(`Deleting topic "${topic}" will permanently delete the topic and all associated commands`);
  const isConfirmed = await confirmInput('Are you sure you want to delete this topic?');
  if (isConfirmed === true) {
    deleteTopic(topic);
    console.log(`Topic "${topic}" deleted`);
  } else {
    console.log('Topic not deleted');
  }
}
