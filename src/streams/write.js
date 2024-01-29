import * as path from 'path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'url';
import fs from 'fs';

const write = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const sourceFileName = path.join(__dirname, 'files', 'fileToWrite.txt');

	const streamWrite = fs.createWriteStream(sourceFileName);

	process.stdin.pipe(streamWrite);
};

await write();
