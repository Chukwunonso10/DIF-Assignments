function AtbashHasher(word) {
  
  //get the alphabet.
 let alphabet = 'abcdefghijklmnopqrstuvwxyz';
 let pattern = /[a-z]/g;

 //replacing each character in the word with its corresponding character in the reversed alphabet.
 let result = word.toLowerCase().replace(pattern, (match) => {
  //get the index of the letter in the alphabet.
    let index = alphabet.indexOf(match);
    return alphabet[alphabet.length - 1 - index];
  });
  return result;
}

console.log(AtbashHasher('g'))




