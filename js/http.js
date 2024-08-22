const baseUrl = 'http://ton.hnbangyao.net'
var tokenToken = { // 要发送给后端的数据
	'token': localStorage.getItem('token') || '',
}
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
				manifestUrl: 'https://slinadan.github.io/babySwap/tonconnect-manifest.json',
				buttonRootId: 'ton-connect'
			});
function apiHttp($, url, params = {}) {
	console.log('////////////', params);
	// console.log(Object.assign(tokenToken,params));
	return new Promise((resolve, reject) => {
		$.ajax({
			url: baseUrl + url,
			dataType: "jsonp",
			jsonp: 'callback',
			data: Object.assign(tokenToken, params),
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

function setFooter(data) {
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
	data.article4.forEach((item, i) => {
		const div = document.createElement('div');
		const span = document.createElement('span');
		const img = document.createElement('img');
		div.classList.add('flex')
		span.innerHTML = item.title
		img.src = './images/us' + i + '.png'
		div.appendChild(img);
		div.appendChild(span);
		ourCommunity.appendChild(div);
		div.addEventListener('click', () => {
			window.open(item.url)
		})
	})
}
let popup = document.getElementById('popup')
let popup1 = document.getElementById('popup1')
let morePopup = document.getElementById('morePopup')
let moreModal = document.getElementById('moreModal')
let bindWallet = document.getElementById('bindWallet')
let walletWrap = document.getElementById('walletWrap')

function closeModal() {
	popup.style.display = 'none';
}

function showMore(e) {
	console.log(6);
	morePopup.style.display = 'flex';
	moreModal.style.animation = "toLeftAnimate 0.4s forwards"; // 应用上滑动画  
}
// 点击模态框外部时，也关闭它  
window.onclick = function(event) {
	console.log('window.onclick10011111111111111');
	if (event.target == popup) {
		popup.style.display = "none";
	} else if (event.target == popup1) {
		popup1.style.display = "none";
	} else if (event.target == morePopup) {
		// moreModal.style.animationDirection = 'reverse'
		moreModal.style.animation = "toRightAnimate 0.4s forwards"; // 应用上滑动画  
		// moreModal.classList.remove('active')
		setTimeout(() => {
			morePopup.style.display = "none";
		}, 200)
	}
}