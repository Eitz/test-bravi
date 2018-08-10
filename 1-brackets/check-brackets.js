#!/usr/bin/env node
'use strict';

// cmd-line interface
let argument = process.argv[2];

if (argument) {
 if (checkBrackets(argument))
  console.log('The provided string is valid.');
 else
  console.log('The provided string is invalid.');
}

function checkBrackets(testString) {
 
 let brackets = {
  '}' : '{',
  ']' : '[',
  ')' : '(',
 };
 
 let stack = [];
 
 for (let char of testString) {
  // opening brackets
  if (Object.values(brackets).includes(char))
   stack.push(char);
  
  // closing brackets
  if (brackets[char]) {
   let lastBracket = stack.pop();
   
   // invalid scope
   if (lastBracket !== brackets[char])
    return false;
  }
 }
 // check if there is still an open scope
 return stack.length % 2 === 0;
}

module.exports = checkBrackets;