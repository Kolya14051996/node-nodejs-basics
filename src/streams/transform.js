import {Transform} from 'node:stream';

const transform = async () => {
	const reversTransform = new Transform({
		transform(chunk, encoding, callback) {
			const reversChunk = chunk.toString().split('').reverse().join('');
			callback(null, reversChunk);
		},
	});

	process.stdin.pipe(reversTransform).pipe(process.stdout);
};

await transform();
