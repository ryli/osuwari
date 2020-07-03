
let [timestamp] = Deno.args
let now = Date.now()

if (timestamp) {
  if (timestamp.length < 13) timestamp += '000'
  now = Number(timestamp)
}

if (now) {
  const time = new Date(now)
  const formatTime = `${time.getFullYear()}-${padZero(time.getMonth() + 1)}-${padZero(time.getDate())} ${padZero(time.getHours())}:${padZero(time.getMinutes())}:${padZero(time.getSeconds())}`

  console.log(formatTime)
} else {
  console.error('timestamp is wrong')
}

function padZero(num: Number) {
  return num < 10 ? `0${num}` : `${num}`
}
