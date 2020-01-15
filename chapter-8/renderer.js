let { ipcRenderer }   = require('electron')

const Timer = require('timer.js')
const timerContainer = document.getElementById('timer-container')
const workTimer =  new Timer({
	tick: 1,
	ontick: updateTime,
	onend(){
		notification()
	}
})

function startWork() {
	workTimer.start(5)
}

async function notification() {
	let res = await ipcRenderer.invoke('work-notification')
	if(res === 'rest'){
		setTimeout(()=>{
			let notofication = new Notification('结束休息, 开始工作吧!')
			startWork()
		}, 1000)
	}else{
		startWork()
	}
}

function updateTime(ms) {
	console.log(ms)

	let s=  (ms/1000).toFixed(0)
	let ss = (s % 60).toFixed(0)
	let mm = (s/60).toFixed(0)

	timerContainer.innerText = `${String(mm).padStart(2,'0')}:${String(ss).padStart(2, '0')}`
}

startWork()
