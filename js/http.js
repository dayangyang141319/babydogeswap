const baseUrl = 'http://ton.hnbangyao.net'
var tokenToken = { // 要发送给后端的数据
	'token': localStorage.getItem('token') || '',
}

function apiHttp($, url, params = {}) {
	console.log('////////////',params);
	// console.log(Object.assign(tokenToken,params));
	return new Promise((resolve, reject) => {
		$.ajax({
			url: baseUrl + url,
			dataType: "jsonp",
			jsonp: 'callback',
			data: Object.assign(tokenToken,params),
			success: (res) => {
				resolve(res)
			},
			error: (error) => {
				console.log('error', error);
				reject(error)
			},
		})
	})
}
function setFooter (data) {
	document.getElementById('twaName').innerHTML = data.name
	let ourCommunity = document.getElementById('ourCommunity')
	let dt1 = document.getElementById('dt1')
	let dt2 = document.getElementById('dt2')
	let dt3 = document.getElementById('dt3')
	data.article1.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = item.title
		dt1.appendChild(li);
		li.addEventListener('click', () => {
			window.open(item.url)
		})
	})
	data.article2.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = item.title
		dt2.appendChild(li);
		li.addEventListener('click', () => {
			window.open(item.url)
		})
	})
	data.article3.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = item.title
		dt3.appendChild(li);
		li.addEventListener('click', () => {
			window.open(item.url)
		})
	})
	data.article4.forEach((item,i) => {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const img = document.createElement('img');
		div.classList.add('flex')
		span.innerHTML = item.title
		img.src = './images/us'+i+'.png'
		div.appendChild(img);
		div.appendChild(span);
		ourCommunity.appendChild(div);
		div.addEventListener('click', () => {
			window.open(item.url)
		})
	})
}