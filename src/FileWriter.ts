import {
  appendFileSync,
  writeFileSync,
} from 'fs';

export interface FileWriteable {
  create: (filename: string) => void;
  writeLine: (filename: string, data: string) => void;
}

export class FileWriter implements FileWriteable {
  private dirPath: string;

  constructor(dirPath: string) {
    this.dirPath = dirPath;
  }

  create(filename: string): void {
    writeFileSync(`${this.dirPath}/${filename}`, '');
  }

  writeLine(filename: string, data: string): void {
    appendFileSync(`${this.dirPath}/${filename}`, `${data}\n`);
  }
}
