import { cube } from './math';
import pintMe from './print';
import data from './data.json';

window.onload=function(){

	const testbabel = () => console.log('引入成功');
	testbabel();
	const babelList = [1,2,3].map((n) => n+1);
	console.log(babelList);

	const myJsonData = document.createElement('div');
	myJsonData.innerHTML = data.name;
	myJsonData.id = 'ok';
	document.body.appendChild(myJsonData);
	const btn = document.createElement('button');
	btn.innerHTML = '点击';
	btn.onclick = pintMe;
	myJsonData.appendChild(btn);


	const mathBtn = document.createElement('button');
	mathBtn.innerHTML = [
		'hello webpack',
		`2 cubed is equal toi${cube(2)}`,
	];

	myJsonData.appendChild(mathBtn);

	const myImage = document.createElement('div');
	myImage.id = 'myImage';
	myJsonData.appendChild(myImage);

	const envImage = document.createElement('div');
	envImage.id = 'envImage';
	envImage.innerHTML = `${NEVCONFIG.ENVTEST}`;
	myJsonData.appendChild(envImage);
};
