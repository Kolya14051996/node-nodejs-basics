import * as path from 'path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'url';

import { createReadStream } from 'fs';



const read = async () => {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const sourceFileName = path.join(__dirname, 'files', 'fileToRead.txt');
    const stream = createReadStream(sourceFileName,{encoding: 'utf-8'})

    stream.on('data', (chunk) =>{
        process.stdout.write(chunk)
    } )

    stream.on('end', () =>{
        console.log('');
    })
	
    stream.on('error', (error)=>{
        console.error(error);
    })


};

await read();
