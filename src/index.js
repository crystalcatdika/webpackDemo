import './style/index.css';
import api from './api';
import createImageDataSrc from './utils/createQrcode';

// 上传Excel
const batchBtn = document.getElementsByClassName('batchQr')[0];
batchBtn.addEventListener('click', () => {
	let input = document.createElement('input');
	input.type='file';
	input.click();
	input.onchange = () => {
		const formData = new FormData();
		formData.append('file', input.files[0]);
		api
			.getBatchQr({
				formData,
			})
			.then(({data}) => {
				return createBatchQr(data);
				// alert('上传Excel成功');
			})
			.catch((err) => {
				throw err;
				// alert('上传Excel失败');
			});
	};
});

// 生成qrSrc
const createBatchQr = (data) => {
	const getQrPromises = data.map((item) => {
		return createImageDataSrc(item)
			.catch((err) => {
				return { error: true };
			})
			.then((result) => {
				return Object.assign({}, item, result);
			});
	});
	return Promise.all(getQrPromises)
		.then((qrData) => {
			if (!qrData.find((item) => item.error)) {
				const pngQr1 = document.getElementsByClassName('pngQr')[0];
				const pngQr2 = document.getElementsByClassName('pngQr')[1];
				const pngQr3 = document.getElementsByClassName('pngQr')[2];
				pngQr1.src = qrData[0].pngQrSrc;
				pngQr2.src = qrData[1].pngQrSrc;
				pngQr3.src = qrData[2].pngQrSrc;
			}
		});
};









