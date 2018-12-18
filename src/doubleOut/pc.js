import { cube } from '../math';
import pintMe from '../print';
import data from '../data.json';

window.onload=function(){

	const testbabel = () => console.log(1248);
	testbabel();

	const myJsonData = document.createElement('div');
	myJsonData.innerHTML= data.name;
	myJsonData.id = 'ok';
	document.body.appendChild(myJsonData);
	var btn = document.createElement('button');
	btn.innerHTML = '点击';
	btn.onclick = pintMe;
	myJsonData.appendChild(btn);


	var mathBtn = document.createElement('button');
	mathBtn.innerHTML = [
		'hello webpack',
		'8 cubed is equal toi' + cube(8)
	];

	myJsonData.appendChild(mathBtn);

	const myImage= document.createElement('div');
	myImage.id= 'myImage';
	myJsonData.appendChild(myImage);
};
