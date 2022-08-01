import cl from 'command-line-args';

import { CheatSheet } from './CheatSheet';

enum PrimaryCommands {
  Select = 'select',
  Topics = 'topics',
  Commands = 'cmds',
}

enum OptionNames {
  PrimaryCmd = 'primaryCommand',
  List = 'list',
  Create = 'create',
}

export class CliArgsInterface {
  private validCommands = Object.values(PrimaryCommands);

  private mainCmdDefinitions: cl.OptionDefinition[] = [
    {
      name: OptionNames.PrimaryCmd,
      defaultOption: true,
      defaultValue: PrimaryCommands.Select,
      type: String,
    },
  ];

  private subCmdDefinitions: cl.OptionDefinition[] = [
    {
      name: OptionNames.List,
      alias: 'l',
      defaultValue: true,
      type: Boolean,
    },
    {
      name: OptionNames.Create,
      alias: 'c',
      type: Boolean,
    },
  ];

  private cheatSheet: CheatSheet;

  constructor(cheatSheet: CheatSheet) {
    this.cheatSheet = cheatSheet;
  }

  private handleSelect(): void {
    this.cheatSheet.selectCommand();
  }

  private async handleTopics(argv: string[] = []): Promise<void> {
    const subCommandArgs = cl(this.subCmdDefinitions, { argv });
    if (subCommandArgs[OptionNames.Create]) {
      return this.cheatSheet.addTopic();
    } else if (subCommandArgs[OptionNames.List]) {
      return this.cheatSheet.listTopics();
    } else {
      console.log('Invalid option provided for topics');
    }
  }

  private async handleCommands(argv: string[] = []): Promise<void> {
    const subCommandArgs = cl(this.subCmdDefinitions, { argv });
    if (subCommandArgs[OptionNames.Create]) {
      return this.cheatSheet.addCommand();
    } else if (subCommandArgs[OptionNames.List]) {
      return this.cheatSheet.listCommands();
    } else {
      console.log('Invalid option provided for commands');
    }
  }

  async exec(): Promise<void> {
    const validCommands = this.validCommands.map((cmd) => `"${cmd}"`).join(', ');
    
    const mainCommand = cl(this.mainCmdDefinitions, { stopAtFirstUnknown: true });
    const argv = mainCommand._unknown;
    const primaryCmd = mainCommand[OptionNames.PrimaryCmd];

    switch (primaryCmd) {
      case (PrimaryCommands.Select):
        return this.handleSelect();
      case (PrimaryCommands.Topics):
        return this.handleTopics(argv);
      case (PrimaryCommands.Commands): {
        return this.handleCommands(argv);
      }
      default:
        console.log(`${primaryCmd} is an invalid command. Please choose from ${validCommands}`);
    }
  }

}
