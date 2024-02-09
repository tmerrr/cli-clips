import { listTopics } from '../../repositories/topic';
import { selectInput } from '../helpers';

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
