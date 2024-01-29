import {promises as fs} from 'node:fs';
import * as path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const remove = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const pathFile = path.join(__dirname, 'files', 'fileToRemove.txt');
	try {
		await fs.access(pathFile);

		await fs.unlink(pathFile);
	} catch (error) {
		console.error(error);
		throw new Error('FS operation failed');
	}
};

await remove();
