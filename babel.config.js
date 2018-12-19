const presets = [
	[
		'@babel/env',
		{
			targets: {
				'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
			},
			useBuiltIns: 'usage',
		},
	],
];

module.exports = { presets };
