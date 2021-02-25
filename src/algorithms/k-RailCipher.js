function trimString(word) {
  let newWord = "";
  newWord = word.replace(" ", "");
  newWord = newWord.replace(/(\r\n|\n|\r)/gm, "");
  return newWord.toUpperCase();
}

function createTable(length, key) {
  // creates rows
  let table = new Array(key);

  // creates columns
  for (let col = 0; col < table.length; col++) {
    table[col] = new Array(length);
  }
  return table;
}

function tableCreatePattern(table, word, key) {
  let row = -1;
  let sign = 1;
  for (let col = 0; col < word.length; col++) {
    if (row === key - 1) {
      sign = -1;
    }
    if (row === 0) {
      sign = 1;
    }

    row += sign;

    table[row][col] = word[col];
  }
  return table;
}

export function cipher(word, key) {
  if (
    typeof word !== "string" ||
    word === "" ||
    typeof key !== "number" ||
    key < 2 ||
    isNaN(key)
  )
    return () =>
      alert(
        "Please enter a valid Key and Message. The key must be equal to or greater than 2."
      );

  let newWord = trimString(word);
  let table = createTable(newWord.length, key);
  table = tableCreatePattern(table, newWord, key);

  // Extract ciphertext
  let ciphertext = "";
  for (let row = 0; row < key; row++) {
    for (let col = 0; col < newWord.length; col++) {
      if (table[row][col] !== undefined) ciphertext += table[row][col];
    }
  }

  return ciphertext;
}

function createPlaceholder(length) {
  let placeholder = "";
  for (let i = 0; i < length; i++) {
    placeholder += "-";
  }
  return placeholder;
}

export function decipher(word, key) {
  if (
    typeof word !== "string" ||
    word === "" ||
    typeof key !== "number" ||
    key < 2 ||
    isNaN(key)
  )
    return () =>
      alert(
        "Please ensure you have entered a valid Key and Ciphertext. The key must be equal to or greater than 2."
      );
  word = trimString(word);
  let placeholder = createPlaceholder(word.length);
  let table = createTable(word.length, key);
  table = tableCreatePattern(table, placeholder, key);

  // replace "-" with characters from the cipherteext
  let counter = 0;
  for (let row = 0; row < key; row++) {
    for (let col = 0; col < word.length; col++) {
      if (table[row][col] === "-") {
        table[row][col] = word[counter];
        counter++;
      }
    }
  }

  // extract plaintext
  let plaintext = "";
  let row = -1;
  let sign = 1;
  for (let col = 0; col < word.length; col++) {
    if (row === key - 1) {
      sign = -1;
    }
    if (row === 0) {
      sign = 1;
    }

    row += sign;

    plaintext += table[row][col];
  }

  return plaintext;
}
