#!/usr/bin/env node
'use strict';

let checkBrackets = require('./check-brackets');

let invalidInput = ['{})', '{', '([{})]', '({)'];
let validInput   = ['({})', '{}', '[({})]', '{([])}', '({[]})[]{}'];

let errors = [];

for (let str of validInput) {
 if (!checkBrackets(str)) {
  errors.push(`Error: '${str}' is a valid string!`);
 }
}

for (let str of invalidInput) {
 if (checkBrackets(str)) {
  errors.push(`Error: '${str}' is an invalid string!`);
 }
}

if (!errors.length)
 console.log('All tests ok!');
else
 for (let err of errors)
  console.log(err);
