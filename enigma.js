const LetterCollection = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const arrow1 = [
    ['A', 'S'],
    ['S', 'D'],
    ['D', 'F'],
    ['F', 'A']
]
const wheel1 = new Map(arrow1)
var pressKey = function(e) {
    console.log(e.id);
    //加密
    let rawletter = e.id.at(-1)
    let cyletter = encrypt(rawletter)

    document.querySelector(`#light${cyletter}`).className = 'lightOn' //亮灯
    setTimeout(() => {
        document.querySelector(`#light${cyletter}`).className = 'light'
    }, 1000)



    document.querySelector('#plaintext').innerHTML += e.innerHTML //写
    document.querySelector('#ciphertext').innerHTML += cyletter

}

function encrypt(rawletter) {
    return wheel1.get(rawletter)
}