import * as path from 'path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'url';
import fs from 'fs'

const write = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
	const sourceFileName = path.join(__dirname, 'files', 'fileToWrite.txt');

    const streamWrite = fs.createWriteStream(sourceFileName)

    process.stdin.pipe(streamWrite)

    // streamWrite.on('finish', () => {
    //     console.log(`Data written to ${streamWrite}`);
    //   });

    //   streamWrite.on('error', (error) => {
    //     console.error(`Error writing to file: ${error.message}`);
    //   });
};

await write();