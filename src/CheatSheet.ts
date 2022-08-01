import clipboard from 'clipboardy';

import { FileReadable } from './FileReader';
import { FileWriteable } from './FileWriter';
import { CliInterface, CliInterfaceable } from './CliInterface';

export class CheatSheet {
  topics: string[];

  private topicsReader: FileReadable;

  private topicsWriter: FileWriteable;

  private cli: CliInterfaceable;

  constructor(
    topicsReader: FileReadable,
    topicsWriter: FileWriteable,
  ) {
    this.topicsReader = topicsReader;
    this.topicsWriter = topicsWriter;
    this.topics = this.topicsReader.list();
    this.cli = new CliInterface(); // could inject if needed
  }

  async selectTopic(): Promise<string | void> {
    const topics = this.topicsReader.list();
    if (topics.length === 0) {
      console.log('No topics available, must create a topic first');
    } else {
      const topic = await this.cli.select('Select a topic', topics);
      return topic;
    }
  }

  async addTopic(): Promise<void> {
    const input = await this.cli.ask('Enter a new topic name');
    const topic = input.toLowerCase();
    if (this.topics.includes(topic)) {
      console.log(`Topic "${topic}" already exists`);
      return;
    }

    this.topicsWriter.create(topic);
    console.log(`Successfully created new topic "${topic}"`);
    this.topics = this.topicsReader.list();
  }

  listTopics(): void {
    console.log(this.topics.join('\n'));
  }

  private async selectCommandForTopic(topic: string): Promise<string | undefined> {
    const topicContent = this.topicsReader.read(topic);

    if (!topicContent) {
      return;
    }

    const commands = topicContent.split('\n');
    return this.cli.select('Select a command', commands);
  }

  async selectCommand(): Promise<void> {
    const topic = await this.selectTopic();
    if (!topic) {
      return;
    }
    const command = await this.selectCommandForTopic(topic);
    if (command) {
      await clipboard.write(command);
      console.log(command);
      console.log('Command has been copied to clipboard');
    } else {
      console.log(`No commands available for topic "${topic}"`);
    }
  }

  async addCommand(): Promise<void> {
    const topic = await this.selectTopic();
    if (!topic) {
      return;
    }
    if (!this.topics.includes(topic)) {
      console.log(`Topic "${topic}" does not exist`);
      return;
    }

    const command = await this.cli.ask(`Enter new command for topic "${topic}"`);
    this.topicsWriter.writeLine(topic, command);
    console.log(`Successfully created new command for topic "${topic}"`);
  }

  async listCommands(): Promise<void> {
    const topic = await this.selectTopic();
    if (!topic) {
      return;
    }
    if (!this.topics.includes(topic)) {
      console.log(`Topic "${topic}" does not exist`);
      return;
    }

    const commands = this.topicsReader.read(topic);
    console.log(commands);
  }
}
