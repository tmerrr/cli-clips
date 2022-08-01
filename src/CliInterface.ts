import inquirer from 'inquirer';

export interface CliInterfaceable {
  ask: (question: string) => Promise<string>;
  select: (question: string, choices: string[]) => Promise<string>;
}

export class CliInterface implements CliInterfaceable {
  async ask(question: string): Promise<string> {
    const key = 'Q';
    const answer = await inquirer.prompt([
      {
        name: key,
        message: question,
        prefix: '',
        type: 'input',
      }
    ]);
    return answer[key].trim();
  }

  async select(question: string, choices: string[]): Promise<string> {
    const key = 'Q';
    const answer = await inquirer.prompt([
      {
        name: key,
        message: question,
        prefix: '',
        type: 'list',
        choices,
      }
    ]);
    return answer[key].trim();
  }
}
