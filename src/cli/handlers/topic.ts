import { getInput, selectInput, editInput } from '../helpers';
import {
  topicExists,
  createTopic,
  listTopics,
  renameTopic,
  deleteTopic,
} from '../../repositories/topic';

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
    topics.forEach((topic) => console.log(topic));
  } else {
    console.log('No topics found');
  }
};

export const editTopic = async () => {
  const topics = listTopics();
  if (topics.length) {
    const topic = await selectInput('Select topic to edit: ', topics);
    const newName = await editInput(topic);
    if (topicExists(newName)) {
      console.error(`Topic "${newName}" already exists`);
      return;
    }
    renameTopic(topic, newName);
    console.log(`Topic "${topic}" renamed to "${newName}"`);
  } else {
    console.log('No topics found');
  }
};

export const removeTopic = async () => {
  const topics = listTopics();
  if (topics.length) {
    const topic = await selectInput('Select topic to delete: ', topics);
    deleteTopic(topic);
    console.log(`Topic "${topic}" deleted`);
  } else {
    console.log('No topics found');
  }
}
