import os from 'os';
import path from 'path';

export const CHEAT_SHEET_DIRECTORY = path.join(os.homedir(), '.cli-clips');

export enum SubCommand {
  Add = 'add',
  List = 'ls',
  Edit = 'edit',
  Remove = 'rm',
}
