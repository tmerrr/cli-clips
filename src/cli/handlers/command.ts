import cb from 'clipboardy';

import { listCommands, overwriteCommandsInTopic } from '../../repositories/commands';
import {
  getInput,
  editInput,
  confirmInput,
  selectInput,
  selectCommandFromTopic,
} from '../helpers';
import { selectTopic } from './common';

export const addCommand = async () => {
  const topic = await selectTopic('Select topic to add command:');
  if (topic === null) {
    return;
  }
  const commands = await listCommands(topic);
  const command = await getInput('Enter command: ');
  if (!command) {
    console.log('Cannot enter empty value');
    return;
  }
  if (commands.includes(command)) {
    console.error('Command already exists in topic');
    return;
  }
  commands.push(command);
  overwriteCommandsInTopic(topic, commands);
  console.log('Command added to topic');
};

export const printCommands = async () => {
  const topic = await selectTopic('Select topic to print commands:');
  if (topic === null) {
    return;
  }
  const commands = listCommands(topic);
  if (commands.length === 0) {
    console.log('No commands in topic');
    return;
  }
  console.log(commands.join('\n'));
};

export const editCommand = async () => {
  const topic = await selectTopic('Select topic to edit command:');
  if (topic === null) {
    return;
  }
  const commands = listCommands(topic);
  if (commands.length === 0) {
    console.log('No commands in topic');
    return;
  }
  const command = await selectInput('Select command to edit:', commands);
  const updatedCommand = await editInput(command);
  if (!updatedCommand) {
    console.log('Cannot enter empty value');
    return;
  }
  if (updatedCommand === command) {
    console.log('No changes made');
    return;
  }
  if (commands.includes(updatedCommand)) {
    console.error('Command already exists in topic');
    return;
  }

  const idx = commands.indexOf(command);
  commands[idx] = updatedCommand;
  overwriteCommandsInTopic(topic, commands);
  console.log('Command updated');
};

export const removeCommand = async () => {
  const topic = await selectTopic('Select topic to delete command:');
  if (topic === null) {
    return;
  }
  const commands = listCommands(topic);
  if (commands.length === 0) {
    console.log('No commands in topic');
    return;
  }
  const command = await selectInput('Select command to delete:', commands);
  const isConfirmed = await confirmInput('Are you sure you want to delete this command?');
  if (isConfirmed === true) {
    const idx = commands.indexOf(command);
    commands.splice(idx, 1);
    overwriteCommandsInTopic(topic, commands);
    console.log('Command deleted');
  } else {
    console.log('Command not deleted');
  }
};

export const copyCommandToClipboard = async () => {
  const topic = await selectTopic('Select topic:');
  if (topic === null) {
    return;
  }
  const command = await selectCommandFromTopic(
    topic,
    'Select command:',
  );
  if (command === null) {
    return;
  }
  await cb.write(command);
  console.log('Command copied to clipboard');
};
