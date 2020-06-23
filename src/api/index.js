import request from './http';

export default {
	getBatchQr(data, config) {
		return request.post({ url: '/home/geBatchQr', data: data.formData, config });
	},
	sendFiles(data, config) {
		return request.post({ url: '/home/sendFiles', data: data.formData, config });
	}
};
