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
			const useableQrcode = qrData.filter((item) => !item.error);
			const pngQr1 = document.getElementsByClassName('qrcodeBox')[0];
			useableQrcode.forEach((item) => {
				const img = document.createElement('img');
				img.src=item.pngQrSrc;
				pngQr1.appendChild(img);
			});
		});
};









