import { CheatSheet } from './CheatSheet';
import { FileReader } from './FileReader';
import { FileWriter } from './FileWriter';
import { CliArgsInterface } from './CliArgsInterface';

const topicsReader = new FileReader(`${__dirname}/../topics`);
const topicsWriter = new FileWriter(`${__dirname}/../topics`);
const cheatSheet = new CheatSheet(topicsReader, topicsWriter);

const argsInterface = new CliArgsInterface(cheatSheet);
argsInterface.exec();
