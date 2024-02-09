import { SubCommand } from '../constants';
import { addCommand, copyCommandToClipboard, editCommand, printCommands, removeCommand } from './handlers/command';
import { addTopic, editTopic, printTopics, removeTopic } from './handlers/topic';

export { copyCommandToClipboard };

export const handleTopic = (subcommand?: string) => {
  switch (subcommand) {
    case SubCommand.Add:
      addTopic();
      break;
    case undefined: // list by default
    case SubCommand.List:
      printTopics();
      break;
    case SubCommand.Edit:
      editTopic();
      break;
    case SubCommand.Remove:
      removeTopic();
      break;
    default:
      console.log(`"${subcommand}" is an invalid command for the "topic" resource`);
  }
};

export const handleCommand = (subcommand?: string) => {
  switch (subcommand) {
    case undefined: // copy cmd by default
      copyCommandToClipboard();
      break;
    case SubCommand.Add:
      addCommand();
      break;
    case SubCommand.List:
      printCommands();
      break;
    case SubCommand.Edit:
      editCommand();
      break;
    case SubCommand.Remove:
      removeCommand();
      break;
    default:
      console.log(`"${subcommand}" is an invalid command for the "command" resource`);
      break;
  }
};
