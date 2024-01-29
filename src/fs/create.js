import * as fs from 'node:fs/promises';
import * as path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const create = async () => {
	const content = 'I am fresh and young.';
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const pathFile = path.resolve(__dirname, 'files', 'fresh.txt');
	
	

	try {
		await fs.access(pathFile);

		throw new Error('FS operation failed');
	} catch (error) {
		if (error.code === 'ENOENT') {
			try {
				await fs.writeFile(pathFile, content);
			} catch (error) {
				console.error(error);
			}
		} else {
			console.error(error);
		}
	}
};

await create();
