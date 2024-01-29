const parseArgs = () => {
	const argv = process.argv.slice(2);

	const result = {};
	let resultStr = '';

	for (let i = 0; i < argv.length; i += 2) {
		const key = argv[i].replace(/--/, '');
		const value = argv[i + 1];
		result[key] = value;
	}

	Object.entries(result).forEach(([key, value]) => {
		resultStr += ` ${key} is ${value},`;
	});

	console.log(resultStr.slice(1,-1));
};

parseArgs();
