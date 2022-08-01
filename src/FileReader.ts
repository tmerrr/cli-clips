import {
  readFileSync,
  readdirSync,
} from 'fs';

export interface FileReadable {
  list: () => string[];
  read: (filename: string) => string;
}

export class FileReader implements FileReadable {
  private dirPath: string;

  constructor(dirPath: string) {
    this.dirPath = dirPath;
  }

  list(): string[] {
    return readdirSync(this.dirPath);
  }

  read(filename: string): string {
    return readFileSync(`${this.dirPath}/${filename}`)
      .toString()
      .trim();
  }
}
