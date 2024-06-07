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

const del = document.querySelector('#delete');
const period = document.querySelector('#period');
console.log(period)

function first(e){
    if(e.target.textContent === period.textContent){
        period.disabled = true;
    }
    console.log(e.target)
    display.textContent += e.target.textContent;
    displayValue = display.textContent
    firstNumber += e.target.textContent;
    secondNumber = ''
    console.log("first" + firstNumber)
}
function second(e){
    if(e.target.textContent === period.textContent){
        period.disabled = true;
    }    
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
        period.disabled = false;
        if(operator != undefined && secondNumber === ''){
            operator = e.target.textContent
            display.textContent = `${firstNumber} ${operator}`
            return;
        }
        
        if(operator != undefined){
            const result = operate(operator, +firstNumber, +secondNumber);
            operator = e.target.textContent
            display.textContent = `${result} ${operator}`
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
    period.disabled = false;
    display.textContent = ""
    displayValue = display.textContent
    firstNumber = ''
    secondNumber = ''
    operator = undefined
    numbers.forEach(element => element.addEventListener('click', first))
    numbers.forEach(element => element.removeEventListener('click', second))
});



numbers.forEach(element => {
    element.addEventListener('click', function(){
        element.classList.add('clicked');
        setTimeout(function() {
            element.classList.remove('clicked');
        }, 100);
    });
});


// WIP

// del.addEventListener('click',(e)=>{
//     const updated =  display.textContent.slice(0, -1);
//     // Update the appropriate variable based on the current state
//     if (operator) {
//         // If an operator is defined, update the secondNumber variable
//         secondNumber = updated
//         display.textContent =  secondNumber
//         console.log(secondNumber)
//     } else {
//         // If no operator is defined, update the firstNumber variable
//         firstNumber = updated
//         display.textContent =  firstNumber
//         console.log(firstNumber)
//     }})