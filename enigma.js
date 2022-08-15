const LetterCollection = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A']
const arrow1 = [
    ['A', 'S'],
    ['B', 'D'],
    ['D', 'A'],
    ['G', 'H'],
    ['H', 'V'],
    ['V', 'P'],
    ['P', 'M'],
    ['M', 'L'],
    ['L', 'E'],
    ['E', 'R'],
    ['R', 'W'],
    ['W', 'C'],
    ['C', 'F'],
    ['F', 'U'],
    ['U', 'G'],
    ['S', 'B'],
    ['Q', 'T'],
    ['T', 'Y'],
    ['Y', 'I'],
    ['I', 'J'],
    ['J', 'K'],
    ['K', 'Z'],
    ['Z', 'X'],
    ['X', 'O'],
    ['O', 'N'],
    ['N', 'Q'],
]
const arrow2 = [
    ['A', 'S'],
    ['B', 'D'],
    ['D', 'A'],
    ['G', 'H'],
    ['H', 'V'],
    ['V', 'P'],
    ['P', 'M'],
    ['M', 'L'],
    ['L', 'E'],
    ['E', 'R'],
    ['R', 'W'],
    ['W', 'C'],
    ['C', 'F'],
    ['F', 'U'],
    ['U', 'G'],
    ['S', 'B'],
    ['Q', 'T'],
    ['T', 'Y'],
    ['Y', 'I'],
    ['I', 'J'],
    ['J', 'K'],
    ['K', 'Z'],
    ['Z', 'X'],
    ['X', 'O'],
    ['O', 'N'],
    ['N', 'Q'],
]
const arrow3 = [
    ['A', 'S'],
    ['B', 'D'],
    ['D', 'A'],
    ['G', 'H'],
    ['H', 'V'],
    ['V', 'P'],
    ['P', 'M'],
    ['M', 'L'],
    ['L', 'E'],
    ['E', 'R'],
    ['R', 'W'],
    ['W', 'C'],
    ['C', 'F'],
    ['F', 'U'],
    ['U', 'G'],
    ['S', 'B'],
    ['Q', 'T'],
    ['T', 'Y'],
    ['Y', 'I'],
    ['I', 'J'],
    ['J', 'K'],
    ['K', 'Z'],
    ['Z', 'X'],
    ['X', 'O'],
    ['O', 'N'],
    ['N', 'Q'],
]
const reflect = [
    ['P', 'Q'],
    ['Q', 'P'],
    ['W', 'O'],
    ['O', 'W'],
    ['E', 'I'],
    ['I', 'E'],
    ['R', 'U'],
    ['U', 'R'],
    ['T', 'Y'],
    ['Y', 'T'],
    ['A', 'G'],
    ['G', 'A'],
    ['S', 'H'],
    ['H', 'S'],
    ['D', 'J'],
    ['J', 'D'],
    ['F', 'K'],
    ['K', 'F'],
    ['Z', 'L'],
    ['L', 'Z'],
    ['X', 'C'],
    ['C', 'X'],
    ['V', 'B'],
    ['B', 'V'],
    ['N', 'M'],
    ['M', 'N'],
]
const wheel1 = new Map(arrow1)
const wheel1rvs = new Map(arrow1.map((v) => [v[1], v[0]]))
const wheel2 = new Map(arrow2)
const wheel2rvs = new Map(arrow2.map((v) => [v[1], v[0]]))
const wheel3 = new Map(arrow3)
const wheel3rvs = new Map(arrow3.map((v) => [v[1], v[0]]))
const reflector = new Map(reflect)
var wheelposes = [0, 0, 0]

function previousRotor(i) {
    wheelposes[i] = (wheelposes[i] + 25) % 26;
    refreshRotor()
}

function nextRotor(i) {
    wheelposes[i] = (wheelposes[i] + 1) % 26;
    refreshRotor()
    if (wheelposes[i] == 0 && i >= 1) {
        nextRotor(i - 1)
    }
}

var pressKey = function(e) {

    //加密
    let rawletter = e.id.at(-1)
    let cyletter = encrypt(rawletter, ...wheelposes)

    document.querySelector(`#light${cyletter}`).className = 'lightOn' //亮灯
    setTimeout(() => {
        document.querySelector(`#light${cyletter}`).className = 'light'
    }, 600)

    nextRotor(2)

    document.querySelector('#plaintext').innerHTML += e.innerHTML //写
    document.querySelector('#ciphertext').innerHTML += cyletter

}

function encrypt(rawletter, pos1, pos2, pos3) {
    let wheel3input = LetterCollection[(LetterCollection.indexOf(rawletter) + pos3) % 26]
        //console.log(wheel3input);
    let wheel3output = wheel3.get(wheel3input)
        //console.log(wheel3output);
    let wheel2input = LetterCollection[(LetterCollection.indexOf(wheel3output) + pos2) % 26]
        //console.log(wheel2input);
    let wheel2output = wheel2.get(wheel2input)
        //console.log(wheel2output);
    let wheel1input = LetterCollection[(LetterCollection.indexOf(wheel2output) + pos1) % 26]
        //console.log(wheel1input);
    let wheel1output = wheel1.get(wheel1input)
        //console.log(wheel1output);
    let reverseraw = reflector.get(wheel1output)
        //console.log(reverseraw);
    let wheel1rvsinput = reverseraw
        //console.log(wheel1rvsinput);
    let wheel1rvsoutput = wheel1rvs.get(wheel1rvsinput)
        //console.log(wheel1rvsoutput);
    let wheel2rvsinput = LetterCollection[(LetterCollection.indexOf(wheel1rvsoutput) - pos1 + 26) % 26]
        //console.log(wheel2rvsinput);
    let wheel2rvsoutput = wheel2rvs.get(wheel2rvsinput)
        //console.log(wheel2rvsoutput);
    let wheel3rvsinput = LetterCollection[(LetterCollection.indexOf(wheel2rvsoutput) - pos2 + 26) % 26]
        //console.log(wheel3rvsinput);
    let wheel3rvsoutput = wheel3rvs.get(wheel3rvsinput)
        //console.log(wheel3rvsoutput);
    let res = LetterCollection[(LetterCollection.indexOf(wheel3rvsoutput) - pos3 + 26) % 26]
    return res
}

function clearText() {
    document.querySelector('#plaintext').innerHTML = '<h2>Plaintext:</h2>' //清空
    document.querySelector('#ciphertext').innerHTML = '<h2>Ciphertext:</h2>'
}

function switchToEncrypt() {
    wheelposes = [0, 0, 0]
    refreshRotor()
    clearText()
}

function switchToDecrypt() {
    wheelposes = [0, 0, 0]
    refreshRotor()
    clearText()
}

function refreshRotor() {
    document.querySelector('#rotors').children[0].children[0].innerHTML = LetterCollection[(wheelposes[0] + 1) % 26];
    document.querySelector('#rotors').children[0].children[1].innerHTML = LetterCollection[wheelposes[0]];
    document.querySelector('#rotors').children[0].children[2].innerHTML = LetterCollection[(wheelposes[0] + 25) % 26];
    document.querySelector('#rotors').children[1].children[0].innerHTML = LetterCollection[(wheelposes[1] + 1) % 26];
    document.querySelector('#rotors').children[1].children[1].innerHTML = LetterCollection[wheelposes[1]];
    document.querySelector('#rotors').children[1].children[2].innerHTML = LetterCollection[(wheelposes[1] + 25) % 26];
    document.querySelector('#rotors').children[2].children[0].innerHTML = LetterCollection[(wheelposes[2] + 1) % 26];
    document.querySelector('#rotors').children[2].children[1].innerHTML = LetterCollection[wheelposes[2]];
    document.querySelector('#rotors').children[2].children[2].innerHTML = LetterCollection[(wheelposes[2] + 25) % 26];
}

function displayRotorSettings() {
    document.querySelector('.settings').style.display = 'block'
}

function cancleSet() {
    document.querySelector('.settings').style.display = 'none'
}

function applySet() {
    let rotor1set = document.querySelector('#rotor1Setting').value
    let rotor2set = document.querySelector('#rotor2Setting').value
    let rotor3set = document.querySelector('#rotor3Setting').value
    wheelposes = [LetterCollection.indexOf(rotor1set), LetterCollection.indexOf(rotor2set), LetterCollection.indexOf(rotor3set)]
    refreshRotor()
    document.querySelector('.settings').style.display = 'none'
}