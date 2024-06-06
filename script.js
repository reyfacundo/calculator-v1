function add(one,two){
    return one + two
}
function substract(one,two){
    return one - two
}
function multiply(one,two){
    return one * two
}
function divide(one,two){
    if(two === 0) return "Nuh uh"
    return one / two
}

function operate(operator, one, two){
    switch (operator) {
        case '+' :
            return add(one,two);
        case '-':
            return substract(one,two);
        case 'x':
            return multiply(one,two);
        case '/':
            return divide(one,two);
        default:
            break;
    } 
}

let displayValue
let firstNumber = ''
let operator
let secondNumber = ''

const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const equals = document.querySelector('#equals');
const operatorEvent = document.querySelectorAll('.operator');
const clear =  document.querySelector('#clear');


function first(e){
    display.textContent = '';
    display.textContent += e.target.textContent;
    displayValue = display.textContent
    firstNumber += e.target.textContent;
    secondNumber = ''
    console.log("first" + firstNumber)
}
function second(e){
    display.textContent += e.target.textContent;
    displayValue = display.textContent
    secondNumber += e.target.textContent;
    console.log("second" + secondNumber)
}


numbers.forEach(element => {
    element.addEventListener('click', first)
});
operatorEvent.forEach(element =>{
    element.addEventListener('click',(e)=>{
        if(operator != undefined && secondNumber === ''){
            operator = e.target.textContent
            display.textContent = `${firstNumber}${operator}`
            return;
        }
        
        if(operator != undefined){
            const result = operate(operator, +firstNumber, +secondNumber);
            operator = e.target.textContent
            display.textContent = `${result}${operator}`
            firstNumber = result
            secondNumber = ''
            return
        }

        if (secondNumber !== '') {
            secondNumber = ''; 
        }

        display.textContent += ` ${e.target.textContent} `
        displayValue = display.textContent
        operator = e.target.textContent
        numbers.forEach(element => element.removeEventListener('click', first))
        numbers.forEach(element => element.addEventListener('click', second))
    })
});


equals.addEventListener('click', ()=>{
    if(secondNumber == '') return
    const result = operate(operator, +firstNumber, +secondNumber)
    display.textContent = result
    operator = undefined
    firstNumber = result
    secondNumber = ''
    displayValue = display.textContent
});


clear.addEventListener('click', ()=>{
    display.textContent = "_"
    displayValue = display.textContent
    firstNumber = ''
    secondNumber = ''
    operator = undefined
    numbers.forEach(element => element.addEventListener('click', first))
    numbers.forEach(element => element.removeEventListener('click', second))
});
