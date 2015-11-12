/*! Chancer 0.2.0 | https://github.com/howlingmad/chancer */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.chancer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var chancer = module.exports = {
    random: random,
    randomFloat: randomFloat,
    randomInt: randomInt,
    coinToss: coinToss,
    fromArray: fromArray,
    shuffleArray: shuffleArray,
    randomArray: randomArray,
    randomUUID: randomUUID
};

// Returns a floating-point number between 0 and 1
function random () {
    return Math.random();
}

// Returns a random number between <min> (inclusive) and <max> (exclusive)
function randomFloat (min, max) {
    if (!isNaN(min) && !isNaN(max)) {
        return Math.random() * (max - min) + min;
    }
    else {
        return undefined;
    }
}

// Returns a random integer between <min> (inclusive) and <max> (inclusive)
function randomInt (min, max) {
    if (!isNaN(min) && !isNaN(max)) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    else {
        return undefined;
    }
}

// Returns a 0 or 1 to represent a coin toss
// Optionally associate any other values for the coin sides (true/false, yes/no, heads/tails, etc)
function coinToss (heads, tails) {
    var first = (typeof heads !== 'undefined') ? heads : 0;
    var second = (typeof tails !== 'undefined') ? tails : 1;
    return (Math.floor(Math.random() * 2) === 0) ? first : second;
}

// Returns a random item from an array
function fromArray (obj) {
    if (typeof obj !== 'undefined' && obj && obj.constructor === Array) {
        return obj[Math.floor(Math.random() * obj.length)];
    }
    else {
        return undefined;
    }
}

// Returns an array shuffled into a random order
function shuffleArray (obj) {
    if (typeof obj !== 'undefined' && obj && obj.constructor === Array) {
        return shuffle(obj);
    }
    else {
        return undefined;
    }
}
function shuffle (arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var j = chancer.randomInt(0, i);
        if (j !== i) {
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
    return arr;
}

// Returns an array of integers between <min> (inclusive) and <max> (inclusive)
// If no <total> specified return all possible values between <min> and <max>
function randomArray (min, max, total) {
    if (!isNaN(min) && !isNaN(max)) {
        var num = (total) ? total : (max - min) + 1;
        var arr;
        if (!isNaN(num) && (((max - min) + 1) >= num)) {
            arr = generateArray(min, max, num);
        }
        return arr;
    }
    else {
        return undefined;
    }
}
function generateArray (min, max, total) {
    var arr = [];
    while (arr.length < total) {
        var randomNumber = chancer.randomInt(min, max);
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === randomNumber) {
                found = true;
                break;
            }
        }
        if (!found) {
            arr[arr.length] = randomNumber;
        }
    }
    return arr;
}

// Returns a random value as a universally unique identifier (UUID) version 4 (RFC4122)
// xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
// where x is any hexadecimal digit and y is one of 8, 9, A, or B
// e.g., efe1f2aa-1e99-40f2-83fa-8519acd8c34c
function randomUUID () {
    var hex = '0123456789ABCDEF';
    var result = [];
    for (var i = 0; i < 36; i++) {
        result[i] = Math.floor(Math.random() * 0x10);
    }
    result[14] = 4;
    result[19] = (result[19] & 0x3) | 0x8;
    for (var i = 0; i < 36; i++) {
        result[i] = hex[result[i]];
    }
    result[8] = result[13] = result[18] = result[23] = '-';
    return result.join('');
}

},{}]},{},[1])(1)
});