const sbox = [
  "1100",
  "0101",
  "0110",
  "1011",
  "1001",
  "0000",
  "1010",
  "1101",
  "0011",
  "1110",
  "1111",
  "1000",
  "0100",
  "0111",
  "0001",
  "0010",
];

const sboxInv = [
  "0101",
  "1110",
  "1111",
  "1000",
  "1100",
  "0001",
  "0010",
  "1101",
  "1011",
  "0100",
  "0110",
  "0011",
  "0000",
  "0111",
  "1001",
  "1010",
];

const pBox = [
  0,
  16,
  32,
  48,
  1,
  17,
  33,
  49,
  2,
  18,
  34,
  50,
  3,
  19,
  35,
  51,
  4,
  20,
  36,
  52,
  5,
  21,
  37,
  53,
  6,
  22,
  38,
  54,
  7,
  23,
  39,
  55,
  8,
  24,
  40,
  56,
  9,
  25,
  41,
  57,
  10,
  26,
  42,
  58,
  11,
  27,
  43,
  59,
  12,
  28,
  44,
  60,
  13,
  29,
  45,
  61,
  14,
  30,
  46,
  62,
  15,
  31,
  47,
  63,
];

const pBoxInv = [
  0,
  4,
  8,
  12,
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  52,
  56,
  60,
  1,
  5,
  9,
  13,
  17,
  21,
  25,
  29,
  33,
  37,
  41,
  45,
  49,
  53,
  57,
  61,
  2,
  6,
  10,
  14,
  18,
  22,
  26,
  30,
  34,
  38,
  42,
  46,
  50,
  54,
  58,
  62,
  3,
  7,
  11,
  15,
  19,
  23,
  27,
  31,
  35,
  39,
  43,
  47,
  51,
  55,
  59,
  63,
];

const hexKey = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const binaryKey = {
  "0000": "0",
  "0001": "1",
  "0010": "2",
  "0011": "3",
  "0100": "4",
  "0101": "5",
  "0110": "6",
  "0111": "7",
  1000: "8",
  1001: "9",
  1010: "A",
  1011: "B",
  1100: "C",
  1101: "D",
  1110: "E",
  1111: "F",
};

const alphaKey = {
  A: "00",
  B: "01",
  C: "02",
  D: "03",
  E: "04",
  F: "05",
  G: "06",
  H: "07",
  I: "08",
  J: "09",
  K: "0A",
  L: "0B",
  M: "0C",
  N: "0D",
  O: "0E",
  P: "0F",
  Q: "10",
  R: "11",
  S: "12",
  T: "13",
  U: "14",
  V: "15",
  W: "16",
  X: "17",
  Y: "18",
  Z: "19",
};

const alphaDecKey = {
  "00": "A",
  "01": "B",
  "02": "C",
  "03": "D",
  "04": "E",
  "05": "F",
  "06": "G",
  "07": "H",
  "08": "I",
  "09": "J",
  "0A": "K",
  "0B": "L",
  "0C": "M",
  "0D": "N",
  "0E": "O",
  "0F": "P",
  10: "Q",
  11: "R",
  12: "S",
  13: "T",
  14: "U",
  15: "V",
  16: "W",
  17: "X",
  18: "Y",
  19: "Z",
};

function trimString(word) {
  let newWord = "";
  newWord = word.replace(/\s+/g, "");
  return newWord.toUpperCase();
}

function block(str) {
  str = trimString(str);
  let blocks = [];
  let blockArray = [];
  let diff = 0;
  const filler = "Z";
  for (let i = 0; i < str.length; i += 8) {
    blockArray.push(str.substring(i, i + 8));
  }
  if (blockArray[blockArray.length - 1].length < 8) {
    diff = 8 - blockArray[blockArray.length - 1].length;
    for (let j = 0; j < diff; j++) {
      blockArray[blockArray.length - 1] += filler;
    }
  }
  return blockArray;
}

function blockCiphertext(str) {
  str = trimString(str);
  let blocks = [];
  let blockArray = [];
  let diff = 0;
  const filler = "Z";
  for (let i = 0; i < str.length; i += 16) {
    blockArray.push(str.substring(i, i + 16));
  }
  if (blockArray[blockArray.length - 1].length < 16) {
    diff = 16 - blockArray[blockArray.length - 1].length;
    for (let j = 0; j < diff; j++) {
      blockArray[blockArray.length - 1] += filler;
    }
  }
  return blockArray;
}

function str2hex(str) {
  let strHex = "";
  for (let i = 0; i < str.length; i++) {
    strHex += alphaKey[str[i]];
  }
  return strHex;
}

function hex2binarystr(hex) {
  let binaryString = "";
  for (let i = 0; i < hex.length; i++) {
    binaryString += hexKey[hex[i]];
  }
  return binaryString;
}

function binary2hex(binary) {
  let strBi = "";
  let tmpStr = "";
  for (let i = 0; i < binary.length; i++) {
    tmpStr += binary[i];
    if (tmpStr.length === 4) {
      strBi += binaryKey[tmpStr];
      tmpStr = "";
    }
  }
  return strBi;
}

function binary2String(binary) {
  let str = "";
  let tmpStr = "";
  binary = binary2hex(binary);
  for (let i = 0; i < binary.length; i++) {
    tmpStr += binary[i];
    if (tmpStr.length === 2) {
      str += alphaDecKey[tmpStr];
      tmpStr = "";
    }
  }
  return str;
}

function str2binary(str) {
  return hex2binarystr(str2hex(str));
}

function pLayer(block) {
  let output = [];
  for (let i = 0; i < 64; i++) {
    output[pBox[i]] = block[i];
  }
  return output.join("");
}

function pLayerDec(block) {
  let output = [];
  for (let i = 0; i < 64; i++) {
    output[pBoxInv[i]] = block[i];
  }
  return output.join("");
}

function rotateKey(str, n) {
  let newKey = "";
  newKey += str.substring(str.length - n, str.length);
  newKey += str.substring(0, str.length - n);
  return newKey;
}

function sBoxKeyLayer(str, flag) {
  let newKey = "";
  if (flag) {
    newKey += str.substring(0, 4);
    let keyBits = str.substring(4, 8);
    newKey += sbox[parseInt(keyBits, 2)];
    newKey += str.substring(8);
    return newKey;
  }
  let keyBits = str.substring(0, 4);
  newKey += sbox[parseInt(keyBits, 2)];
  newKey += str.substring(4);
  return newKey;
}

function sBoxLayer(str) {
  let newBits = "";
  let tmpBits = "";
  for (let i = 0; i < str.length; i++) {
    tmpBits += str[i];
    if (tmpBits.length === 4) {
      newBits += sbox[parseInt(tmpBits, 2)];
      tmpBits = "";
    }
  }
  return newBits;
}

function sBoxLayerDec(str) {
  let newBits = "";
  let tmpBits = "";
  for (let i = 0; i < str.length; i++) {
    tmpBits += str[i];
    if (tmpBits.length === 4) {
      newBits += sboxInv[parseInt(tmpBits, 2)];
      tmpBits = "";
    }
  }
  return newBits;
}

function strXOR(str1, str2) {
  let newKey = "";
  for (let i = 0; i < str1.length; i++) {
    str1[i] === str2[i] ? (newKey += "0") : (newKey += "1");
  }
  return newKey;
}

function roundKeyXOR(key, i) {
  let newKey = "";
  i = i.toString(2);
  while (i.length < 5) {
    i = "0" + i;
  }
  if (key.length === 80) {
    newKey += key.substring(0, 60);
    let keyBits = key.substring(60, 65);
    newKey += strXOR(keyBits, i);
    newKey += key.substring(65, 80);
    return newKey;
  } else if (key.length === 128) {
    newKey += key.substring(0, 51);
    let keyBits = key.substring(51, 56);
    newKey += strXOR(keyBits, i);
    newKey += key.substring(56, 128);
    return newKey;
  }
}

function generateRoundKeys80(key, rounds = 32) {
  let roundKeys = [];
  for (let i = 1; i <= rounds; i++) {
    roundKeys.push(key.substring(0, 64));
    key = rotateKey(key, 19);
    key = sBoxKeyLayer(key);
    key = roundKeyXOR(key, i);
  }

  return roundKeys;
}

function generateRoundKeys128(key, rounds = 32) {
  let roundKeys = [];
  for (let i = 1; i <= rounds; i++) {
    roundKeys.push(key.substring(0, 64));
    key = rotateKey(key, 67);
    key = sBoxKeyLayer(key);
    key = sBoxKeyLayer(key, 1);
    key = roundKeyXOR(key, i);
  }

  return roundKeys;
}

function blocks2Binary(blocks) {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i] = str2binary(blocks[i]);
  }
  return blocks;
}

function hexBlocks2Binary(blocks) {
  for (let i = 0; i < blocks.length; i++) {
    blocks[i] = hex2binarystr(blocks[i]);
  }
  return blocks;
}

export function cipher(plaintext, key, keyLength) {
  // xor key
  // sbox every 4 groups of bits
  // permutate
  // Repeat
  let blocks = block(plaintext);
  blocks = blocks2Binary(blocks);
  console.log(blocks);
  let keys;
  key = completeKeyLength(key, keyLength);
  if (key.length === 80) {
    keys = generateRoundKeys80(key);
  } else if (key.length === 128) {
    keys = generateRoundKeys128(key);
  }

  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < blocks.length; j++) {
      if (i === 31) {
        blocks[j] = strXOR(blocks[j], keys[i]);
        break;
      }
      // step 1: xor plaintext and key
      blocks[j] = strXOR(blocks[j], keys[i]);
      // step 2: sbox every 4 groups of bits
      blocks[j] = sBoxLayer(blocks[j]);
      // step 3: permutate
      blocks[j] = pLayer(blocks[j]);
      // console.log("Round Key " + (i+1) + ": "+ binary2hex(blocks[j]));
    }
  }
  // console.log("Round Key " + 32 + ": "+ binary2hex(blocks[blocks.length-1]))

  for (let i = 0; i < blocks.length; i++) {
    blocks[i] = binary2hex(blocks[i]);
  }
  return blocks;
}

export function ciphertextString(plaintext, key, keyLength) {
  return cipher(plaintext, key, keyLength).join("");
}

function completeKeyLength(key, length) {
  key = str2binary(key);
  if (key.length === length) return key;
  else if (key.length < length) {
    while (key.length !== length) {
      key += "0100";
    }
    return key;
  } else if (key.length > length) {
    alert("Key too large!!");
  }
}

export function decipher(ciphertext, key, keyLength) {
  // add round key starting backwards
  // player dec
  // sboxlayer dec
  // add first round key

  let blocks = blockCiphertext(ciphertext);
  blocks = hexBlocks2Binary(blocks);
  console.log(blocks);
  let keys;
  key = completeKeyLength(key, keyLength);
  // console.log(key)
  if (key.length === 80) {
    keys = generateRoundKeys80(key);
  } else if (key.length === 128) {
    keys = generateRoundKeys128(key);
  }

  for (let i = 31; i >= 0; i--) {
    for (let j = 0; j < blocks.length; j++) {
      if (i === 0) {
        blocks[j] = strXOR(blocks[j], keys[i]);
        break;
      }
      // step 1: xor plaintext and key
      blocks[j] = strXOR(blocks[j], keys[i]);
      // step 2: permutate
      blocks[j] = pLayerDec(blocks[j]);
      // step 3: sbox every 4 groups of bits
      blocks[j] = sBoxLayerDec(blocks[j]);

      // console.log("Round Key " + (i+1) + ": "+ binary2hex(blocks[j]));
    }
  }
  // console.log("Round Key " + 1 + ": "+ binary2hex(blocks[blocks.length-1]))
  for (let i = 0; i < blocks.length; i++) {
    blocks[i] = binary2String(blocks[i]);
  }
  return blocks;
}

// console.log(cipher("AAAAAAAA", "AAAAAAAAAA", 80));
// console.log(
//   decipher(cipher("AAAAAAAA", "AAAAAAAAAA", 80)[0], "AAAAAAAAAA", 80)
// );
// console.log(cipher("AAAAAAAA", "AAAAAAAAAAAAAAAA", 128));
// console.log(
//   decipher(
//     cipher("AAAAAAAA", "AAAAAAAAAAAAAAAA", 128)[0],
//     "AAAAAAAAAAAAAAAA",
//     128
//   )
// );
