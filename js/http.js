const baseUrl = 'https://ton.hnbangyao.net'
var tokenToken = { // 要发送给后端的数据
	'token': localStorage.getItem('token') || '',
}
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
	manifestUrl: 'https://slinadan.github.io/babySwap/tonconnect-manifest.json',
	buttonRootId: 'ton-connect'
});
let token = localStorage.getItem('token')

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
	document.title = data.name;
	let ourCommunity = document.getElementById('ourCommunity')
	let dt1 = document.getElementById('dt1')
	let dt2 = document.getElementById('dt2')
	let dt3 = document.getElementById('dt3')
	// let addr = localStorage.getItem('address')
	// let walletAddress = document.getElementById('walletAddress')
	// if (walletAddress) {
	// 	walletAddress.innerHTML = sliceAddress(addr, 4, 4)
	// }
	if (dt1) {
		dt1.innerHTML = ''
		data.article1.forEach(item => {
			const li = document.createElement('li');
			li.innerHTML = item.title
			dt1.appendChild(li);
			li.addEventListener('click', () => {
				window.open(item.url)
			})
		})
	}
	if (dt2) {
		dt2.innerHTML = ''
		data.article2.forEach(item => {
			const li = document.createElement('li');
			li.innerHTML = item.title
			dt2.appendChild(li);
			li.addEventListener('click', () => {
				window.open(item.url)
			})
		})
	}
	if (dt3) {
		dt3.innerHTML = ''
		data.article3.forEach(item => {
			const li = document.createElement('li');
			li.innerHTML = item.title
			dt3.appendChild(li);
			li.addEventListener('click', () => {
				window.open(item.url)
			})
		})
	}
	if (ourCommunity) {
		ourCommunity.innerHTML = ''
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

function extractInviteCode(url) {
	// 使用正则表达式匹配 inviteCode= 后面的数字  
	const match = url.match(/inviteCode=(\d+)/);
	if (match) {
		// 如果匹配成功，返回匹配到的数字  
		return match[1];
	}
	// 如果没有匹配到，返回 null 或其他你希望的值  
	return null;
}

function showMore(e) {
	console.log('xxxxx', location.href);
	// if (location.href.indexOf('inviteCode') != -1 && location.href.indexOf('#')) {
	// 	let inviteCode = location.href.split('inviteCode=')[]
	// }
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

function toast(msg) {
	// alert(msg)
	// Telegra.WebApp.showAlert(msg)
	document.getElementById("toastModal").style.display = "block";
	document.getElementById("toastMsg").innerHTML = msg
	setTimeout(() => {
		document.getElementById("toastModal").style.display = "none";
	}, 1000)
}

function copy() {
	let addr = localStorage.getItem('userAddress')
	navigator.clipboard.writeText(addr)
	toast('复制成功')
}
window.addEventListener('ton-connect-connection-completed', (event) => {
	console.log('Transaction init==============', event.detail.wallet_address);
	let inviteCode = extractInviteCode(location.href)
	console.log('inviteCode.........', inviteCode);
	let address = event.detail.wallet_address
	localStorage.setItem('address', address)
	let addr = trsAddress(address)
	
	if (!token) {
		setTimeout(() => {
			login(addr || address, inviteCode)
		}, 500)
	} else {
		loadData()
	}
});
window.addEventListener('ton-connect-disconnection', (event) => {
	console.log('断开连接！！！！！！！', event.detail.wallet_address);
	localStorage.clear()

});

function login(address, inviteCode) {
	apiHttp($, "/api/contract/auth/login", {
		address: address,
		inviteCode: inviteCode || ''
	}).then(res => {
		console.log(res);
		if (res.code == 1) {
			localStorage.setItem('token', res.data.userInfo.token)
			localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
			setTimeout(() => {
				loadData()
			}, 100)
		}
	})
}

function getIndexInfo() {
	let data = localStorage.getItem('twaInfo')
	if (data) {
		setFooter(JSON.parse(data))
	} else {
		apiHttp($, "/api/contract/index/index").then(res => {
			if (res.code == 1) {
				localStorage.setItem('twaInfo', JSON.stringify(res.data))
				setFooter(res.data)
			}
		})
	}
}

function showLoading() {
	document.getElementById("loadingModal").style.display = "block";
}

function hideLoading() {
	document.getElementById("loadingModal").style.display = "none";
}