const screen = document.querySelector("#screen"); //

const atop = document.querySelector("#atop");
const btop = document.querySelector("#btop");
const ctop = document.querySelector("#ctop");

const allclear = document.querySelector("#allclear"); //
const clear = document.querySelector("#clear"); //
const backspace = document.querySelector("#backspace"); //

const carrot = document.querySelector("#carrot"); //
const sqrt = document.querySelector("#sqrt"); //
const divide = document.querySelector("#divide"); //
const times = document.querySelector("#times"); //
const minus = document.querySelector("#minus"); //
const plus = document.querySelector("#plus"); //
const equals = document.querySelector("#equals"); //
const period = document.querySelector("#period"); //

const buttonnum = document.querySelectorAll(".buttonnum"); //

let dispNum = "0";
let num1;
let num2;
let operation;
let answer;
let aCustom = "a"
let bCustom = "b"
let cCustom = "c"


buttonnum.forEach(function (i) {
    i.addEventListener('click', function(){
        changeNumber(i.textContent);
    });
});

atop.addEventListener("click", function(){
    if (aCustom === "a") {
        setCustom("a");
    } else {
        changeNumber(aCustom);                    
    }
})

btop.addEventListener("click", function(){
    if (bCustom === "b") {
        setCustom("b");
    } else {
        changeNumber(bCustom);                    
    }
})

ctop.addEventListener("click", function(){
    if (cCustom === "c") {
        setCustom("c");
    } else {
        changeNumber(cCustom);                    
    }
})

clear.addEventListener("click", function(){
    clearDisplay();
})

allclear.addEventListener("click", function(){
    clearAll();
})

equals.addEventListener("click", function(){
    endCalculation(num1, num2, operation);
})

carrot.addEventListener("click", function(){
    startCalculation();
    operation = "**";
})

divide.addEventListener("click", function(){
    startCalculation();
    operation = "/";
})

times.addEventListener("click", function(){
    startCalculation();
    operation = "*";
})

minus.addEventListener("click", function(){
    startCalculation();
    operation = "-";
})

plus.addEventListener("click", function(){
    startCalculation();
    operation = "+";
})

sqrt.addEventListener("click", function(){
    startCalculation();
    operation = "Math.pow";
})

function changeNumber(userClick){
    if (operation === "inprogress" && userClick != "0") {
        hardClear(userClick);
    } else {
        if (dispNum === "0") {
            dispNum = userClick;
            screen.textContent = dispNum;
        } else if (dispNum.replace(".","").length > 14) {
            // break
        } else if (userClick === ".") {
            if (dispNum.includes(".")) {
                // break
            } else {
                dispNum += ".";
                let formattedDispNum = formatNumber(dispNum);
                screen.textContent = formattedDispNum;
            }
        } else if (userClick === "<--") {
            if (dispNum.charAt(dispNum.length-2) === ".") {
                let dispNumBackspace = dispNum.slice(0, -2);
                dispNum = dispNumBackspace;
                let formattedDispNum = formatNumber(dispNum);
                screen.textContent = formattedDispNum;            
            } else {
                let dispNumBackspace = dispNum.slice(0, -1);
                dispNum = dispNumBackspace;
                let formattedDispNum = formatNumber(dispNum);
                screen.textContent = formattedDispNum;
            }
    
        } else {
            dispNum += userClick;
            let formattedDispNum = formatNumber(dispNum);
            screen.textContent = formattedDispNum;
        }
    }

}

function formatNumber(stringNum) {
    let arrayNum = stringNum.split(".");
    let leftNum = [];
    let rightNum = arrayNum[1];
    let count = 1;
    for (i=arrayNum[0].length; i>0; i--){
        if (count%3 === 0) {
            if (i>1) {
                leftNum.unshift(arrayNum[0][i-1]);
                leftNum.unshift(",")
                count ++;
            } else {
                leftNum.unshift(arrayNum[0][i-1]);
                count ++;
            }
        } else {
            leftNum.unshift(arrayNum[0][i-1]);
            count ++;     
        }
    }
    if (rightNum != undefined) {
        return(leftNum.join("")+"."+rightNum);
    } else {
        return(leftNum.join(""));
    }

}

function startCalculation() {
    if (operation === undefined){
        num1 = parseFloat(dispNum);
        dispNum = "0";
        changeNumber("0");
    } else if (operation === "inprogress") {
        num1 = parseFloat(answer);
        dispNum = "0";
        changeNumber("0");
    }
    
    else {
        // break
    }

}

function endCalculation(num1, num2, operation) {
    num2 = parseFloat(dispNum);
    if (num1 === undefined || num2 === undefined) {
        // break
    } else {
        if (operation === "Math.pow"){
            answer = eval(`${operation}(${num1}, 1/${num2})`);
            answer = formatNumber(answer.toString());
            dispNum = formattedAnswer;
            screen.textContent = formattedAnswer;
            softClear();       
        } else {
            answer = eval(`${num1} ${operation} ${num2}`);
            formattedAnswer = formatNumber(answer.toString());
            dispNum = answer;
            screen.textContent = formattedAnswer;
            softClear();
        }

    }
}

function softClear() {
    num1 = undefined;
    num2 = undefined;
    operation = "inprogress";
}

function hardClear(userClick) {
    num1 = undefined;
    num2 = undefined;
    operation = undefined;
    dispNum = "0";
    changeNumber(userClick);
}

function clearDisplay() {
    dispNum = "0";
    screen.textContent = "";
}

function clearAll() {
    hardClear("0");
    aCustom = "a";
    bCustom = "b";
    cCustom = "c";
    atop.textContent = aCustom;
    btop.textContent = bCustom;
    ctop.textContent = cCustom;
}

function setCustom(customButton) {
    formattedDispNum = formatNumber(dispNum.toString());
    if (customButton === "a") {
        aCustom = dispNum;
        atop.textContent = aCustom;
    } else if (customButton === "b") {
        bCustom = dispNum;
        btop.textContent = bCustom;
    } else {
        cCustom = dispNum;
        ctop.textContent = cCustom; 
    }
}