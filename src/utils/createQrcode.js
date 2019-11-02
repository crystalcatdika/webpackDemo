import QR from 'qrcode';

function createImageDataSrc(item) {
	return new Promise((resolve, reject) => {
		const result = {
			pngQrSrc: null,
			jpgQrSrc: null,
		};
		QR.toCanvas(item.detail, { errorCorrectionLevel: 'm', width: 100,
			height: 100,}, (err, canvas) => {
			if (err) {
				reject(err);
			} else {
				const img = canvas.toDataURL();
				result.pngQrSrc = img;
				result.jpgQrSrc = canvas.toDataURL('image/jpeg');
				resolve(result);
			}
		});
	});
}

export default createImageDataSrc;
