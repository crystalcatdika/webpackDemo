import './style/index.css';
import createImageDataSrc from './utils/createQrcode';

const productList = [
	{
		id:1,
		url: 'https://www.baidu.com'
	},
	{
		id:2,
		url: 'https://www.baidu.com'
	},
];

const createProductQrcode = (item) => {
	createImageDataSrc (item.url)
		.catch(() => ({ error: true }))
		.then((result) => {
			return Object.assign({}, item, result);
		})
		.then((showData) => {
			if (!showData.error) {
				const jpgQr = document.getElementsByClassName('jpgQr')[0];
				jpgQr.src = showData.jpgQrSrc;
				const pngQr = document.getElementsByClassName('pngQr')[0];
				pngQr.src = showData.pngQrSrc;
			}
		});
};

createProductQrcode(productList[0]);




