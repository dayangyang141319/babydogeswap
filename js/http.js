const baseUrl = 'https://ton.hnbangyao.net'
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
				if (res.code != 1) {
					toast(res.msg)
				}
			},
			error: (error) => {
				console.log('error', error);

				reject(error)
			},
		})
	})
}

function setFooter(data) {
	document.querySelectorAll('.twaName').forEach(item => {
		item.innerHTML = data.name
	})
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

function sliceAddress(address, num1 = 4, num2 = 5) {
	if (!address) {
		return ''
	}
	return address.substr(0, num1) + '****' + address.substring(address.length - num2)
};

function formatTimestamp(timestamp, type) {
	// 创建一个Date对象  
	const date = new Date(timestamp * 1000); // 注意：JavaScript中的Date期望毫秒为单位，所以可能需要乘以1000  

	// 提取年月日时分秒  
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以要+1  
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	// 拼接成目标格式  
	if (type == 'date') {
		return `${year}-${month}-${day}`
	} else if (type == 'time') {
		return `${hours}:${minutes}:${seconds}`;
	}
}

function getIndex() {
	let data = localStorage.getItem('twaInfo')
	setFooter(JSON.parse(data))
	let addr = localStorage.getItem('address')
	document.getElementById('walletAddress').innerHTML = sliceAddress(addr, 4, 4)
}

function toast(msg) {
	// alert(msg)
	Telegra.WebApp.showAlert(msg)
}

function copy() {
	// navigator.clipboard.writeText 将文本内容写入剪贴板
	let addr = localStorage.getItem('address')
	navigator.clipboard.writeText(addr)
	toast('复制成功')
}