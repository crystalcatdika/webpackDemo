import './style/index.css';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';

		const dpr = window.devicePixelRatio || 1;
		const meta = document.getElementsByTagName('meta')[1];
		const metaWidth = document.documentElement.clientWidth * dpr;
		meta.setAttribute(
			'content',
			'width=' + metaWidth + 'initial-scale=' + 1 / dpr + ', maximum-scale=' + 1 / dpr + ', minimum-scale=' + 1 / dpr + ', user-scalable=no'
		);

		// 根据需要调整定位，自适应不同设备
		const qrcodeDom = document.getElementsByClassName('qrcode')[0];
		const qrcodeTop = (200 / 37.5) * dpr;
		const qrcodeLeft = (40 / 37.5) * dpr;
		const qrcodeWidth = (160 / 37.5) * dpr;
		const qrcodeHeight = (160 / 37.5) * dpr;

		const qrcodeStyle =
            'position: absolute; cursor: pointer; top:' +
            qrcodeTop +
            'rem; left:' +
            qrcodeLeft +
            'rem; width:' +
            qrcodeWidth +
            'rem; height:' +
            qrcodeHeight +
            'rem;';
		qrcodeDom.setAttribute('style', qrcodeStyle);
	},
	false
);
