let dictionary = {};

for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    const key = `s${i}t${j}`; // Dynamically create key
    const value = i * 10 + j * 5; // Generate some value for the key
    dictionary[key] = value; // Assign value to key
  }
}

for (let i = 1; i <= 2; i++) {
  for (let j = 1; j <= 2; j++) {
    const varName = `s${i}t${j}`;
    console.log(dictionary[varName]); // Access dynamically
  }
}
