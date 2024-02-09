import inquirer from 'inquirer';
import { createInterface } from 'readline';

const KEY = 'Q';

export const getInput = async (question: string): Promise<string> => {
  const answer = await inquirer.prompt([
    {
      name: KEY,
      message: question,
      prefix: '',
      type: 'input',
    }
  ]);
  return answer[KEY].trim();
};

export const selectInput = async (question: string, choices: string[]): Promise<string> => {
  const answer = await inquirer.prompt([
    {
      name: KEY,
      message: question,
      prefix: '',
      type: 'list',
      choices,
    }
  ]);
  return answer[KEY].trim();
};

export const editInput = (value: string): Promise<string> => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.prompt();
    rl.write(value);
    rl.on('line', (input) => {
      resolve(input.trim());
      rl.close();
    });
  })
};
