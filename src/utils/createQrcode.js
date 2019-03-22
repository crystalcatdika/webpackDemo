import QR from 'qrcode';

function createImageDataSrc(url) {
	return new Promise((resolve, reject) => {
		const result = {
			pngQrSrc: null,
			jpgQrSrc: null,
		};
		QR.toCanvas(url, { errorCorrectionLevel: 'm' }, (err, canvas) => {
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
