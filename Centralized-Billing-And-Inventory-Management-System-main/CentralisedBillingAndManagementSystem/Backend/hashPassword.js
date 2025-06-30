// backend/hashPassword.js
const bcrypt = require('bcryptjs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter password to hash: ', async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Hashed password:', hashedPassword);
  readline.close();
});