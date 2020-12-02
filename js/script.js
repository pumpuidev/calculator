let displayElement = document.querySelector('.calc__display');

function parseExpression(str) {
    let numArr = str.split(/[-,+,×,÷]/).filter(Boolean); 
    let strArr = str.split(/([-,+,×,÷])/).filter(Boolean); 
    let opArr = strArr.filter(function (e) {               
        if (e === '-' || e === '+' || e === '×' || e === '÷') {
            return true;
        }
    })
    return [numArr,
        opArr
    ];
}

function checkArraysForError(arr) {
    if (arr[0].length <= arr[1].length) { 
        return true;
    }
    return false;
}

function setDisplay(variable, display) {
    displayVar = variable;
    displayElement.textContent = display;
}

function calculate(parsedArrays) {  
    let nums = parsedArrays[0];
    let ops = parsedArrays[1];
    let result = Number(nums[0]);
    for (let i = 1; i <= ops.length; i += 1) {
        if (ops[i - 1] === '+') {
            result = result + Number(nums[i]);
        } else if (ops[i - 1] === '-') {
            result = result - Number(nums[i]);
        } else if (ops[i - 1] === '×') {
            result = result * Number(nums[i]);
        } else if (ops[i - 1] === '÷') {
            result = result / Number(nums[i]);
        }
    } return result;
}

let displayVar = '';
let btnContent = '';
let btnElements = document.querySelectorAll('.btn__digit, .btn__operator');
for (let i = 0; i < btnElements.length; i += 1) {
    btnElements[i].addEventListener('click', function (event) {
        btnContent = event.target.textContent;
        displayVar += event.target.textContent;
        displayElement.textContent = displayVar;
    })
}

document.querySelector('.btn__equation').addEventListener('click', () => {
    parsedArrays = parseExpression(displayVar);
    if (checkArraysForError(parsedArrays)) {
        setDisplay('', 'Error');
    } else {
        setDisplay(calculate(parsedArrays), calculate(parsedArrays));
    }
})

document.querySelector('.btn__clear').addEventListener('click', () => setDisplay('', ''))