import Spinner from 'https://raw.githubusercontent.com/ameerthehacker/cli-spinners/master/mod.ts'

const spinner = Spinner.getInstance()

interface LoginResponse {
  success: boolean,
  msg: string,
  action: string,
  location: string,
}

try {
  const [username, password] = Deno.args

  if (!username || !password) {
    throw new Error('Username or Password must be provided!')
  }

  await spinner.start('logging in..')

  const res = await login(username, password)

  if (!res.success) {
    const msg = `login failed: ${res.msg}`
    await spinner.stop()
    console.error(msg)
  } else {
    await spinner.setText('network connected.')

    const isOpen = await testConnection()

    await spinner.stop()

    if (isOpen) {
      console.log(hi())
    } else {
      console.error('connected failed!')
    }
  }

} catch (e) {
  await spinner.stop()
  console.error(e)
}

async function login(username: string, password: string) {
  const prefixUrl = 'http://10.0.16.2/ac_portal'
  const rc4Key = Date.now()
  const pwd = doEncryptRc4(password, `${rc4Key}`)
  const res = await fetch(`${prefixUrl}/login.php`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": `${prefixUrl}/default/pc.html?tabs=pwd`,
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `opr=pwdLogin&userName=${username}&pwd=${pwd}&rc4Key=${rc4Key}&rememberPwd=0`,
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  })

  if (res.ok) {
    const text = await res.text()
    // 还是转成对象吧
    const body: LoginResponse = JSON.parse(text.replace(/'/g, '"'))

    return body
  }

  throw new Error('Network response was not ok.')
}

async function testConnection() {
  const url = 'https://www.baidu.com/'
  const res = await fetch(url)
  return res.ok
}

function hi() {
  const words = [
    'osu!',
    'gahaha!',
    'moshimoshi?',
    'hentai!',
    "dame!",
    'yada!',
    'kimochi..',
    'baka!',
    'nande?',
    'yamedei!',
    'arigato!',
    'urusai!'
  ]
  return words[Math.floor(Math.random() * words.length)]
}

// copy from source
function doEncryptRc4(src: string, password: string) {
  src = (src + '').trim();
  password = password + '';
  var i, j = 0, a = 0, b = 0, c = 0, temp;
  var plen = password.length,
    size = src.length;

  var key = Array(256); //int
  var sbox = Array(256); //int
  var output = Array(size); //code of data
  for (i = 0; i < 256; i++) {
    key[i] = password.charCodeAt(i % plen);
    sbox[i] = i;
  }
  for (i = 0; i < 256; i++) {
    j = (j + sbox[i] + key[i]) % 256;
    temp = sbox[i];
    sbox[i] = sbox[j];
    sbox[j] = temp;
  }
  for (i = 0; i < size; i++) {
    a = (a + 1) % 256;
    b = (b + sbox[a]) % 256;
    temp = sbox[a];
    sbox[a] = sbox[b];
    sbox[b] = temp;
    c = (sbox[a] + sbox[b]) % 256;
    temp = src.charCodeAt(i) ^ sbox[c];//String.fromCharCode(src.charCodeAt(i) ^ sbox[c]);
    temp = temp.toString(16);
    if (temp.length === 1) {
      temp = '0' + temp;
    } else if (temp.length === 0) {
      temp = '00';
    }
    output[i] = temp;
  }
  return output.join('');
}
