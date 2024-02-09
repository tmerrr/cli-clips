import os from 'os';
import path from 'path';

export const CHEAT_SHEET_DIRECTORY = path.join(os.homedir(), '.cheat-sheets');

export enum SubCommand {
  Add = 'add',
  List = 'ls',
  Edit = 'edit',
  Remove = 'rm',
}
