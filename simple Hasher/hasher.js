function atbashHasher(text) {
  return text.toLowerCase().replace(/[a-z]/g, (match) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const index = alphabet.indexOf(match);
    return alphabet[alphabet.length - 1 - index];
  });
}

console.log(atbashHasher('hello world'))