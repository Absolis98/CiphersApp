var bigInt = require("big-integer");

var test = bigInt("55");
console.log(test);

const alphaKey = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    " ",
    ".",
    ",",
    "\'",
  ]

  
  function isPrime(num) {
    if (num <= 3) return num > 1;
    
    if ((num % 2 === 0) || (num % 3 === 0)) return false;
    
    let count = 5;
    
    while (Math.pow(count, 2) <= num) {
      if (num % count === 0 || num % (count + 2) === 0) return false;
      
      count += 6;
    }
    
    return true;
  }
  
  function generateRandomPQ(max) {
    let p = Math.floor(Math.random() * max);
    let q = Math.floor(Math.random() * max);
  
      while(true) {
        if(isPrime(p) && isPrime(q) && (p !== q) && (p !== 2) && (q !== 2)) {
          break;
        }
        if(!isPrime(p) || (p === 2))
          p = Math.floor(Math.random() * max);
        if(!isPrime(q) || (q === 2))
          q = Math.floor(Math.random() * max);
        if(p === q)
          p = Math.floor(Math.random() * max);
      }
    return [p, q];
  }
  
  function gcd(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) {
      alert("Please enter numbers.")
      return null;
    }
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }
  
  // given 2 prime numbers p and q, return N = p * q
  function calculateN(pq) {
      return pq[0] * pq[1];
  }
  
  function calculateEulerTotient(pq) {
    return (pq[0]-1)*(pq[1]-1);
  }
  
  
  // calculate possible values for (e, d), ed mod n = 1
  function calculateE(pq) {
    // e must be less than t
    // e must be coprime with n and t
    const n = calculateN(pq);
    const t = calculateEulerTotient(pq);
    const list = [];
  
    for(let i = 2; i < t; i++) {
      if((gcd(i, n) === 1) && (gcd(i, t) === 1)) {
        list.push(i);
      }
    }
    return list[Math.floor(Math.random() * list.length)];
  }
  
  // fix this function. The loop logic is off
  function calculateD(pq, e, limit) {
    const n = calculateN(pq);
    const t = calculateEulerTotient(pq);
    const list = [];
  
    let startingMultiple = 0;
    for(let j = 0; j < t; j++) {
      if((e*j) % t === 1) {
        list.push(j);
        startingMultiple = j;
        break;
      }
    }
  
    for(let i = 0; i < limit-1; i++) {
      startingMultiple += t;
      list.push(startingMultiple);
    }
    return list[Math.floor(Math.random() * list.length)];
  }
  
  export function generateKeys(pqLimit=500, dLimit=2) {
    let pq = generateRandomPQ(pqLimit);
    let n = calculateN(pq)
    let e = calculateE(pq);
    let d = calculateD(pq, e, dLimit);
    return [e, d, n]
  }
  
  // must have a way to regenerate keys if they produce invalid output
export function encrypt(message, keys) {
      let newMessage = '';
      let encryptedValue;
      let encryptedValues = [];
      for(let i = 0; i < message.length; i++) {
        encryptedValue = bigInt(alphaKey.indexOf(message[i])).modPow(keys[0], keys[2]);
        // encryptedValue = BigInt(alphaKey.indexOf(message[i]))**BigInt(keys[0]) % BigInt(keys[2]);
        encryptedValues.push(encryptedValue);
        newMessage += alphaKey[(encryptedValue.mod(55))];
      }
      return [newMessage, encryptedValues];
  }
  
export function decrypt(ciphertext, keys) {
      let plaintext = '';
      for(let i = 0; i < ciphertext[1].length; i++) {
        console.log("about to pass")
        plaintext += alphaKey[bigInt(ciphertext[1][i]).modPow(keys[1], keys[2])]
        // plaintext += alphaKey[((ciphertext[1][i])**BigInt(keys[1]) % BigInt(keys[2]))];
        console.log("passed")
      }
  
      return [plaintext];
  }