import * as fs from 'node:fs/promises';
import * as path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const list = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const sourceDirName = path.join(__dirname,  'files');
	try {
		await fs.access(sourceDirName);
		const filenames = await fs.readdir(sourceDirName);
		console.log(filenames);
	} catch (error) {
		throw new Error('FS operation failed');
	}
};

await list();
