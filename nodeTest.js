function test () {
	console.log('start');
	setTimeout(() => {
		console.log('children2');
		Promise.resolve().then(() => {console.log('children2-1');});
	}, 0);
	setTimeout(() => {
		console.log('children3');
		Promise.resolve().then(() => {console.log('children3-1');});
	}, 0);
	Promise.resolve().then(() => {console.log('children1');});
	console.log('end');

	process.nextTick(() => {console.log('nexTick一级');
		process.nextTick(() => {
			console.log('nextTick二级');
		});
	});


}

test();

