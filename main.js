let checkbox = document.querySelector('input[name="theme"]');
checkbox.addEventListener('change', function(){
    if(this.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
    }
        else{
            document.documentElement.setAttribute('data-theme', 'light');
        }
    
});

function getHistory(){
    return document.querySelector('.upper-value').innerHTML;
}
function printHistory(num){
    document.querySelector('.upper-value').innerHTML= num;
}
function getOutput(){
    return document.querySelector('.lower-value').innerHTML;
}
function printOutput(num){
    if(num==""){
        document.querySelector('.lower-value').innerHTML=num;
    }
    else{
        document.querySelector('.lower-value').innerHTML=getFormattedNumber(num);
    }
}

function getFormattedNumber(num){
    if(num==""){
        return "";
    }
    let n= Number(num);
    let value = n.toLocaleString("en");
    return value;
}


// function getFormatNumber(num) {
//     if (num == "-") {
//       return "";
//     }
//     if (num.length > 10) {
//       num = num.substr(0, 10);
//       alert("it tooo much!");
//     }
  
//     // to check whether a dot is placed just a the end of num like 6.
//     let lastIndexOfDot  = num.toString().lastIndexOf(".") ; 
//     let isDotted  =lastIndexOfDot  == false ? false: lastIndexOfDot == num.length-1 ? true : false ; 
  
//     var n =  Number(num); 
  
//     if (n === "Infinity") {
//       value = "0";
//       alert("Error");
//     } else {
//       var value = n.toLocaleString("en");
//     }
//      // if dotted is true then value has a dot at the end like : 5. so we return value  with its dot 
//      if (isDotted ) return value +"." ; 
  
//      return value;  // no dot at the end 
//   }


function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}
// function reverseNumberFormat(num) {
//     return num.replace(/,/g, "");  // => Nb: conversion not necessary
//   }

let operator = document.getElementsByClassName("operator");
for( let i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            let output =reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0, output.length-1);
                printOutput(output);
            }
        }
            else{
                let output= getOutput();
                let history = getHistory();
                if(output == "" && history != ""){
                    if(isNaN(history[history.length-1])){
                        history=history.substr(0,history.length-1);
                    }
                }
                if(output != "" || history !=""){
                    output= output == ""?output: reverseNumberFormat(output);
                    history= history + output;
                    if(this.id=="="){
                        let result = eval(history);
                        printOutput(result);
                        printHistory("");
                    }
                    else if(this.id=="%"){
                        let n = reverseNumberFormat(getOutput());
                        let percent = n/100;
                        printOutput(percent.toFixed(4));
                    }
                    else{
                        history= history+this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
            }
        
    })
}

let number = document.getElementsByClassName('number');
for( let i=0; i<number.length;i++){
    number[i].addEventListener('click',function(){
        let output = reverseNumberFormat(getOutput());

        if(output != NaN){
            output = output + this.id;
            printOutput(output);
        }
    })
}


// let number = document.getElementsByClassName("number");
// for (let i = 0; i < number.length; i++) {
//   number[i].addEventListener("click", function () {
//     let output = reverseNumberFormat(getOutput());

//     if (output != NaN ) {
//       output += this.id;  
//       // CHECK HERE IF output is already a valid decimal number 
//       let matchCount = output.match(/\./g) ;
    
//       if( matchCount && matchCount.length > 1 ) return  ; // => already decimal number 
//       printOutput(output);
//    }

//  });
// }

