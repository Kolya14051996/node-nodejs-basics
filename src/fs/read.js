import * as fs from 'node:fs/promises';
import * as path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const sourceDirName = path.join( __dirname, 'files', 'fileToRead.txt');

	try {
		await fs.access(sourceDirName);

		const fileContent = await fs.readFile(sourceDirName, {encoding: 'utf8'});
		console.log(fileContent);
	} catch (error) {
		throw new Error('FS operation failed');
	}
};

await read();
