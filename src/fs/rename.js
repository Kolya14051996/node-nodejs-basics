import {promises as fs} from 'node:fs';
import * as path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';


const rename = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url))
	const oldSourceDir = path.join(__dirname, 'files', 'wrongFilename.txt');
	const newSourceDir = path.join(__dirname, 'files', 'properFilename.md');

	try {
		await fs.access(oldSourceDir);
		try {
			await fs.access(newSourceDir);

			throw new Error('FS operation failed');
		} catch (error) {
			if (error.code === 'ENOENT') {
				try {
					await fs.rename(oldSourceDir, newSourceDir);
				} catch (error) {
					console.error(error);
				}
			}
		}
	} catch (error) {
		throw new Error('FS operation failed');
	}
};

await rename();
