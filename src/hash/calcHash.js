import fs from 'node:fs/promises';
import path, {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'crypto';
import {createReadStream} from 'node:fs';


const calculateHash = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const pathFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

	try {
		const data = await fs.readFile(pathFile);
		const hash = crypto.createHash('SHA256')

		const stream = createReadStream(pathFile);

        stream.on('data', () =>{
            hash.update(data)
        })
		stream.on('end', () => {
			console.log(hash.digest('hex'));
		});

        stream.on('error', (error) =>{
            console.error(error);
        })
	} catch (error) {
		console.error(error);
	}
};
await calculateHash();
